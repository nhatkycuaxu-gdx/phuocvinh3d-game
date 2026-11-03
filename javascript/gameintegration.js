class GameDataSync {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.transfer = new MultiProtocolTransfer();
        const host = window.location.hostname || 'localhost';
        const isSecure = window.location.protocol === 'https:';
        this.serverUrl = `${isSecure ? 'https' : 'http'}://${host}:3000`;
        this.wsUrl = `${isSecure ? 'wss' : 'ws'}://${host}:3000`;
        this.syncInterval = 1000;
        this.lastSyncTime = 0;
        this.usbReaderRunning = false;
        this.init();
    }

    async init() {
        console.log('Khởi tạo Game Data Sync (chỉ mạng)...');
        // Chỉ giữ kết nối mạng — đã tắt USB / Bluetooth / Audio
        try { this.transfer.initWebSocket(this.wsUrl); } catch (_) {}
        this.moveConnectionUIToSettings();
        this.startAutoSync();
        // Không còn nút hardware
        const hw = document.getElementById('hardwareConnectionButtons');
        if (hw) hw.innerHTML = '<p style="color:#888;font-size:12px;margin:0">Error: 401 :( - *(.js) - Deleted: 19:30/1-11-2026</p>';
        console.log('Game Data Sync (network-only) đã sẵn sàng');
    }


    moveConnectionUIToSettings() {
        const target = document.getElementById('multiplayerSettings');
        const panel = document.querySelector('.multi-panel');
        if (target && panel) target.appendChild(panel);
    }

    addSettingsButton(id, text, available, color, handler) {
        const container = document.getElementById('hardwareConnectionButtons');
        if (!container) return;
        const old = document.getElementById(id);
        if (old) old.remove();

        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = text;
        btn.style.background = color;
        btn.style.display = available ? 'block' : 'none';
        btn.onclick = handler;
        container.appendChild(btn);
    }

    startAutoSync() {
        if (this.syncTimer) clearInterval(this.syncTimer);
        this.syncTimer = setInterval(() => this.syncGameState(), this.syncInterval);
    }

    getGameState() {
        const g = this.game || {};
        const player = g.player || {};
        const inv = g.inventory || {};
        const pos = player.position || g.position || { x: 0, y: 0, z: 0 };

        return {
            playerPos: {
                x: Number(pos.x) || 0,
                y: Number(pos.y) || 0,
                z: Number(pos.z) || 0
            },
            inventory: {
                gold: inv.money || inv.gold || 0,
                items: inv.items || [],
                equipment: inv.equipment || []
            },
            health: {
                current: player.hp ?? 100,
                max: player.hpMax ?? 100,
                mana: player.mana ?? 0
            },
            stats: {
                level: player.level ?? 1,
                experience: player.exp ?? 0,
                playtime: Math.floor(Date.now() / 1000)
            },
            timestamp: new Date().toISOString()
        };
    }

    async syncGameState() {
        const now = Date.now();
        if (now - this.lastSyncTime < this.syncInterval) return;
        this.lastSyncTime = now;

        const gameState = this.getGameState();
        if (!this.transfer.sendWebSocketData(gameState)) {
            this.transfer.addToQueue(gameState);
        }
    }

    makeButton(id, text, right, available, color, handler) {
        const old = document.getElementById(id);
        if (old) old.remove();

        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = text;
        btn.style.cssText = `
            position: fixed; bottom: 20px; right: ${right}px;
            padding: 10px 15px; background: ${color}; color: white;
            border: none; border-radius: 5px; cursor: pointer;
            z-index: 100; display: ${available ? 'block' : 'none'};
        `;
        btn.onclick = handler;
        document.body.appendChild(btn);
        return btn;
    }

    setupBluetoothButton() {
        this.addSettingsButton('bluetooth-btn', 'Bluetooth', !!navigator.bluetooth, '#2196f3', () => this.connectBluetooth());
    }

    setupUSBButton() {
        this.addSettingsButton('usb-btn', 'USB', !!navigator.usb, '#ff9800', () => this.connectUSB());
    }

    setupSerialButton() {
        this.addSettingsButton('serial-btn', 'Serial', !!navigator.serial, '#9c27b0', () => this.connectSerial());
    }

    setupGamepadButton() {
        this.addSettingsButton('gamepad-btn', 'Tay cầm', !!navigator.getGamepads, '#607d8b', () => this.selectGamepad());
    }

    setupAudioButton() {
        this.addSettingsButton('audio-btn', 'Audio', true, '#4caf50', async () => {
            await this.transfer.transmitDataAsSound(this.getGameState());
            this.showNotification('Đã phát dữ liệu qua âm thanh');
        });
    }

    isBluetoothAvailable() { return !!navigator.bluetooth; }
    isUSBAvailable() { return !!navigator.usb; }

    async connectBluetooth() {
        const result = await this.transfer.initBluetooth();
        if (result.success) {
            this.setStatus('bluetooth', 'connected');
            this.showNotification(`Bluetooth: ${result.device} (${result.mode})`);
        } else {
            this.setStatus('bluetooth', 'error');
            alert(`Bluetooth: ${result.error}`);
        }
    }

    async connectUSB() {
        const result = await this.transfer.initUSB();
        if (result.success) {
            this.setStatus('usb', 'connected');
            this.showNotification(`USB: ${result.device} — ${result.mode}`);
            this.startUSBReader();
        } else {
            this.setStatus('usb', 'error');
            alert(`USB: ${result.error}`);
        }
    }

    async connectSerial() {
        const result = await this.transfer.initSerial();
        if (result.success) {
            this.setStatus('serial', 'connected');
            this.showNotification(`Serial: ${result.mode}`);
        } else {
            this.setStatus('serial', 'error');
            alert(`Serial: ${result.error}`);
        }
    }

    async startUSBReader() {
        if (this.usbReaderRunning) return;
        this.usbReaderRunning = true;
        while (this.transfer.usbDevice) {
            const data = await this.transfer.receiveUSBData();
            if (data) this.handleRemoteGameState(data);
            await new Promise(r => setTimeout(r, 20));
        }
        this.usbReaderRunning = false;
    }

    selectGamepad() {
        const pads = navigator.getGamepads ? navigator.getGamepads() : [];
        const connected = [...pads].filter(Boolean);
        if (!connected.length) {
            alert('Chưa thấy tay cầm. Hãy kết nối USB/Bluetooth tay cầm rồi bấm lại.');
            return;
        }
        const pad = connected[0];
        this.transfer.gamepadIndex = pad.index;
        this.setStatus('gamepad', 'connected');
        this.showNotification(`🎮 Đã chọn: ${pad.id}`);
    }

    startGamepadSupport() {
        this.transfer.startGamepadMonitor(pad => {
            const x = pad.axes?.[0] || 0;
            const y = pad.axes?.[1] || 0;
            const dead = 0.15;
            if (Math.abs(x) > dead || Math.abs(y) > dead) {
                this.gamepadInput = { x, y };
                window.gamepadInput = this.gamepadInput;
            }
        });
    }

    handleRemoteGameState(data) {
        console.log('Nhận trạng thái từ thiết bị:', data);
        window.dispatchEvent(new CustomEvent('game-remote-state', { detail: data }));
    }

    setStatus(protocol, status) {
        let el = document.getElementById(`status-${protocol}`);
        if (!el) {
            el = document.createElement('div');
            el.id = `status-${protocol}`;
            el.style.cssText = `
                position: static; margin-top: 5px; padding: 6px 8px;
                background: rgba(0,0,0,.45); color: #fff; border-radius: 5px;
                font: 11px monospace; z-index: 1;
            `;
            const statusBox = document.getElementById('connectionStatusList');
            if (statusBox) statusBox.appendChild(el);
            document.body.appendChild(el);
        }
        el.textContent = `${protocol}: ${status === 'connected' ? '🟢 connected' : '🔴 ' + status}`;
    }

    showNotification(message) {
        const n = document.createElement('div');
        n.textContent = message;
        n.style.cssText = `
            position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
            background: rgba(0,0,0,.9); color: #fff; padding: 15px 25px;
            border-radius: 8px; z-index: 9999;
        `;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key.toLowerCase() === 'b') { e.preventDefault(); this.connectBluetooth(); }
            if (e.ctrlKey && e.key.toLowerCase() === 'u') { e.preventDefault(); this.connectUSB(); }
            if (e.ctrlKey && e.key.toLowerCase() === 'r') { e.preventDefault(); this.connectSerial(); }
            if (e.ctrlKey && e.key.toLowerCase() === 'd') { e.preventDefault(); this.toggleDebugPanel(); }
        });
    }

    toggleDebugPanel() {
        const p = document.getElementById('debug-sync-panel');
        if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
    }

    createDebugPanel() {
        const old = document.getElementById('debug-sync-panel');
        if (old) old.remove();

        const panel = document.createElement('div');
        panel.id = 'debug-sync-panel';
        panel.style.cssText = `
            position: fixed; top: 60px; left: 20px; background: rgba(0,0,0,.9);
            color: #0f0; padding: 15px; border-radius: 8px; font: 12px monospace;
            z-index: 9999; max-width: 320px; display: none;
        `;
        document.body.appendChild(panel);

        if (this.debugTimer) clearInterval(this.debugTimer);
        this.debugTimer = setInterval(() => {
            const s = this.getGameState();
            const ws = this.transfer.ws?.readyState === WebSocket.OPEN ? 'OPEN' : 'CLOSED';
            panel.innerHTML = `
                <b>GAME CONNECTION DEBUG</b><hr>
                Pos: (${s.playerPos.x.toFixed(1)}, ${s.playerPos.y.toFixed(1)}, ${s.playerPos.z.toFixed(1)})<br>
                Health: ${s.health.current}/${s.health.max}<br>
                WebSocket: ${ws}<br>
                Connection: ${this.transfer.connectionType || 'none'}<br>
                Queue: ${this.transfer.dataQueue.length}<br>
                Bluetooth: ${!!this.transfer.bluetoothDevice}<br>
                USB: ${!!this.transfer.usbDevice}<br>
                Serial: ${!!this.transfer.serialPort}<br>
                Gamepad: ${this.transfer.gamepadIndex ?? 'none'}
            `;
        }, 500);
    }
}
function initGameSync() {
    if (window.gameSync) return window.gameSync;
    const game = window.gameInstance || window;
    window.gameSync = new GameDataSync(game);
    return window.gameSync;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGameSync, { once: true });
} else {
    initGameSync();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameDataSync;
}
