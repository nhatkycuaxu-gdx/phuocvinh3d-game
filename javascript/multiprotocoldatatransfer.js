
class MultiProtocolTransfer {
    constructor() {
        this.connection = null;
        this.ws = null;
        this.isConnected = false;
        this.connectionType = null;
        this.dataQueue = [];
    }

    async connectNetwork(url) {
        try {
            if (!url) throw new Error('Thiếu địa chỉ mạng.');
            // Ưu tiên WebSocket nếu là ws/wss
            if (url.startsWith('ws://') || url.startsWith('wss://')) {
                return await this.initWebSocket(url);
            }
            // Còn lại để game dùng PeerJS (đã có sẵn trong index)
            this.isConnected = true;
            this.connectionType = 'network';
            return { success: true, mode: 'network', message: 'Sẵn sàng kết nối mạng P2P.' };
        } catch (error) {
            console.error('Lỗi kết nối mạng:', error);
            return { success: false, error: error.message };
        }
    }

    async initWebSocket(url) {
        return new Promise((resolve) => {
            try {
                this.ws = new WebSocket(url);
                this.ws.onopen = () => {
                    this.isConnected = true;
                    this.connectionType = 'websocket';
                    resolve({ success: true, mode: 'websocket', url });
                };
                this.ws.onmessage = (ev) => {
                    try {
                        const data = JSON.parse(ev.data);
                        this.handleIncoming(data);
                    } catch (_) {
                        this.handleIncoming({ type: 'raw', text: ev.data });
                    }
                };
                this.ws.onclose = () => {
                    this.isConnected = false;
                    this.connectionType = null;
                };
                this.ws.onerror = (e) => {
                    resolve({ success: false, error: 'WebSocket lỗi' });
                };
            } catch (e) {
                resolve({ success: false, error: e.message });
            }
        });
    }

    handleIncoming(data) {
        if (typeof window !== 'undefined' && typeof window.onP2PData === 'function') {
            window.onP2PData(data);
        }
        console.log('[Network] nhận:', data);
    }

    async send(data) {
        if (!this.isConnected) return false;
        try {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(data));
                return true;
            }
            // PeerJS connection được quản lý ở index.html
            return false;
        } catch (e) {
            console.error('Gửi mạng lỗi:', e);
            return false;
        }
    }

    disconnect() {
        try { this.ws?.close(); } catch (_) {}
        this.ws = null;
        this.isConnected = false;
        this.connectionType = null;
    }

    // Stub các API cũ để không crash nếu còn gọi
    async initBluetooth() { return { success: false, error: 'Bluetooth đã bị tắt.' }; }
    async initUSB() { return { success: false, error: 'USB đã bị tắt.' }; }
    async initAudioContext() { return { success: false, error: 'Truyền âm thanh đã bị tắt.' }; }
    async sendBluetoothData() { return false; }
    async sendUSBData() { return false; }
    async sendMultiChannel() { return { network: await this.send(arguments[0]) }; }
}

window.MultiProtocolTransfer = MultiProtocolTransfer;
window.multiTransfer = new MultiProtocolTransfer();
console.log('MultiProtocol: chỉ còn kết nối mạng.');
