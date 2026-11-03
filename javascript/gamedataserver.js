const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3000;
const BAUD_RATE = 9600;
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const gameDatabase = {};
const connectedClients = new Set();
app.post('/api/gamedata', (req, res) => {
    const { playerPos, inventory, health, gameVersion } = req.body;
    const clientId = req.ip;
    gameDatabase[clientId] = {
        playerPos,
        inventory,
        health,
        gameVersion,
        timestamp: new Date(),
        ip: clientId};
    console.log('Nhận dữ liệu game từ:', clientId);
    console.log('   Vị trí:', playerPos);
    console.log('   Health:', health);
    res.json({
        status: 'success',
        message: 'Dữ liệu đã lưu',
        clientId: clientId,
        dataPoints: Object.keys(gameDatabase).length});});
wss.on('connection', (ws) => {
    connectedClients.add(ws);
    console.log(` WebSocket kết nối! Tổng: ${connectedClients.size} client`);
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Nhận từ client:', data);
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'gamestate',
                        data: data,
                        from: ws._socket.remoteAddress}));}});
            ws.send(JSON.stringify({
                type: 'ack',
                status: 'received',
                timestamp: new Date()
            }));
        } catch (error) {
            console.error('Lỗi WebSocket:', error);}});
    ws.on('close', () => {
        connectedClients.delete(ws);
        console.log(`WebSocket đóng. Còn ${connectedClients.size} client`);});
    ws.on('error', (error) => {
        console.error('⚠ WebSocket error:', error);});});
let serialPort = null;
let parser = null;
async function initSerialConnection(portName = 'COM3') {
    try {
        serialPort = new SerialPort({
            path: portName,
            baudRate: BAUD_RATE,});
        parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
        serialPort.on('open', () => {
            console.log('Cổng serial mở:', portName);
            broadcastToAll({ type: 'system', message: 'USB connected' });});
        parser.on('data', (data) => {
            try {
                const gameData = JSON.parse(data);
                console.log(' Nhận từ USB/Serial:', gameData);
                gameDatabase['usb_device'] = gameData;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'usb_data',data: gameData}));}});
            } catch (error) {
                console.log('⚠ Dữ liệu USB không phải JSON:', data);}});
        serialPort.on('error', (error) => {
            console.error('Lỗi Serial:', error);
        });
    } catch (error) {
        console.error('Lỗi khởi tạo Serial:', error);}}
app.get('/api/gamestates', (req, res) => {
    const states = Object.values(gameDatabase).map(state => ({
        ...state,
        uptime: Date.now() - state.timestamp.getTime()
    }));

    res.json({
        status: 'success',
        count: states.length,
        states: states
    });
});
app.get('/api/gamestate/:clientId', (req, res) => {
    const { clientId } = req.params;
    const state = gameDatabase[clientId];

    if (!state) {
        return res.status(404).json({
            status: 'error',
            message: 'Client không tìm thấy'
        });
    }
    res.json({
        status: 'success',
        state: state
    });
});
app.post('/api/broadcast', (req, res) => {
    const { message, type = 'notification' } = req.body;

    broadcastToAll({
        type: type,
        message: message,
        timestamp: new Date()
    });
    res.json({
        status: 'success',
        clientsNotified: connectedClients.size});});
app.post('/api/send-usb', (req, res) => {
    const { data } = req.body;
    if (!serialPort || !serialPort.isOpen) {
        return res.status(400).json({
            status: 'error',
            message: 'Cổng serial không mở'
        });
    }
    serialPort.write(JSON.stringify(data) + '\n', (error) => {
        if (error) {
            console.error('Lỗi gửi USB:', error);
            return res.json({
                status: 'error',
                message: error.message
            });
        }
        console.log('Gửi tới USB:', data);
        res.json({
            status: 'success',
            message: 'Dữ liệu gửi tới USB'
        });
    });
});
app.get('/api/stats', (req, res) => {
    const allData = Object.values(gameDatabase);
    const totalPlayers = allData.length;
    const avgHealth = allData.reduce((sum, d) => sum + (d.health || 0), 0) / totalPlayers || 0;
    res.json({
        status: 'success',
        totalClients: connectedClients.size,
        totalPlayers: totalPlayers,
        avgHealth: avgHealth.toFixed(2),
        uptime: Math.round(process.uptime()),
        database: Object.keys(gameDatabase).length});});
function broadcastToAll(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));}});}
server.listen(PORT, () => {
    console.log(`
    PHƯỚC VINH 3D - Game Data Server

    Server đang chạy:
    HTTP : http://localhost:${PORT}
    WebSocket : ws://localhost:${PORT}

  ☆Endpoints:
   POST /api/gamedata          - Gửi dữ liệu game
   GET  /api/gamestates        - Lấy tất cả trạng thái
   GET  /api/gamestate/:id     - Lấy trạng thái 1
   POST /api/broadcast         - Broadcast message
   GET  /api/stats             - Thống kê server
   POST /api/send-usb          - Gửi dữ liệu tới USB

  Đợi kết nối từ client...
    `);});
process.on('SIGINT', () => {
    console.log('\n Đóng server...');
    if (serialPort && serialPort.isOpen) {
        serialPort.close();}
    wss.close();
    server.close(() => {
        console.log('Server đã tắt');
        process.exit(0);});});
module.exports = { app, server, wss };
