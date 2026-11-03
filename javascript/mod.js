
class ModSystem {
    constructor() {
        this.mods = new Map();
        this.enabledMods = new Set();
        this.activeFontFamily = null;
        this.loadFromLocalStorage();
    }

    async loadMod(file) {
        if (!file) return { success: false, message: 'Không có file.' };
        const name = String(file.name || 'font');
        const lower = name.toLowerCase();
        const allowed = ['.ttf', '.otf', '.woff', '.woff2'];
        if (!allowed.some(ext => lower.endsWith(ext))) {
            return {
                success: false,
                message: 'Chỉ chấp nhận file font (.ttf / .otf / .woff / .woff2)!'
            };
        }
        try {
            const buffer = await file.arrayBuffer();
            const id = this.makeId(name.replace(/\.(ttf|otf|woff2?)$/i, ''));
            // Lưu dạng base64 để persist
            const bytes = new Uint8Array(buffer);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
            const base64 = btoa(binary);
            const mime = lower.endsWith('.woff2') ? 'font/woff2'
                : lower.endsWith('.woff') ? 'font/woff'
                : lower.endsWith('.otf') ? 'font/otf' : 'font/ttf';
            const mod = {
                id,
                name,
                enabled: true,
                type: 'font',
                base64,
                mime,
                timestamp: Date.now()
            };
            this.mods.set(id, mod);
            this.enabledMods.add(id);
            this.applyFont(mod);
            this.saveToLocalStorage();
            return { success: true, message: `Font "${name}" đã được áp dụng!` };
        } catch (error) {
            console.error('Lỗi font mod:', error);
            return { success: false, message: `Không đọc được font: ${error.message}` };
        }
    }

    makeId(name, fallback = 'font') {
        const base = String(name || fallback).trim()
            .replace(/[^\p{L}\p{N}_-]+/gu, '_')
            .replace(/^_+|_+$/g, '') || fallback;
        let id = base;
        let count = 2;
        while (this.mods.has(id)) id = `${base}_${count++}`;
        return id;
    }

    applyFont(mod) {
        if (!mod || !mod.base64) return;
        const family = `PlayerFont_${mod.id}`;
        const styleId = `mod-font-${mod.id}`;
        let styleEl = document.getElementById(styleId);
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = `
            @font-face {
                font-family: '${family}';
                src: url(data:${mod.mime};base64,${mod.base64}) format('${mod.mime.includes('woff2') ? 'woff2' : mod.mime.includes('woff') ? 'woff' : 'truetype'}');
                font-display: swap;
            }
            body, #ui-layer, #hud, #settingsModal, #net-shop, #currency-shop,
            #actionText, button, input, select, textarea, .hud-item, #chatBox {
                font-family: '${family}', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
            }
        `;
        this.activeFontFamily = family;
        document.body.style.fontFamily = `'${family}', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
    }

    enableMod(modId) {
        const mod = this.mods.get(modId);
        if (!mod) return false;
        mod.enabled = true;
        this.enabledMods.add(modId);
        if (mod.type === 'font') this.applyFont(mod);
        this.saveToLocalStorage();
        return true;
    }

    disableMod(modId) {
        const mod = this.mods.get(modId);
        if (!mod) return false;
        mod.enabled = false;
        this.enabledMods.delete(modId);
        const styleEl = document.getElementById(`mod-font-${modId}`);
        if (styleEl) styleEl.remove();
        // Nếu không còn font nào bật, về mặc định
        const stillOn = Array.from(this.enabledMods).find(id => this.mods.get(id)?.type === 'font');
        if (!stillOn) {
            document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            this.activeFontFamily = null;
        } else {
            this.applyFont(this.mods.get(stillOn));
        }
        this.saveToLocalStorage();
        return true;
    }

    uninstallMod(modId) {
        this.disableMod(modId);
        this.mods.delete(modId);
        this.enabledMods.delete(modId);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        try {
            const arr = Array.from(this.mods.values()).map(m => ({
                id: m.id, name: m.name, enabled: m.enabled, type: m.type,
                base64: m.base64 || '', mime: m.mime || 'font/ttf', timestamp: m.timestamp
            }));
            localStorage.setItem('phuocvinh_mods', JSON.stringify(arr));
        } catch (e) {
            console.error('Lỗi lưu font :', e);
        }
    }

    loadFromLocalStorage() {
        const stored = localStorage.getItem('phuocvinh_mods');
        if (!stored) return;
        try {
            const arr = JSON.parse(stored);
            if (!Array.isArray(arr)) return;
            for (const data of arr) {
                if (!data?.id || data.type !== 'font' || !data.base64) continue;
                const mod = {
                    id: String(data.id),
                    name: String(data.name || data.id),
                    enabled: data.enabled === true,
                    type: 'font',
                    base64: data.base64,
                    mime: data.mime || 'font/ttf',
                    timestamp: Number(data.timestamp) || Date.now()
                };
                this.mods.set(mod.id, mod);
                if (mod.enabled) {
                    this.enabledMods.add(mod.id);
                    this.applyFont(mod);
                }
            }
        } catch (e) {
            console.error('Lỗi tải font :', e);
        }
    }

    getModsList() {
        return Array.from(this.mods.values());
    }

    // Giữ API cũ để không lỗi khi game gọi
    executeAllMods() { /* font đã apply lúc load */ }
    installMod() { return { success: false, message: 'Chỉ nhận file font.' }; }
    loadJavaScriptMod() { return { success: false, message: 'Mod JS đã bị tắt.' }; }
}

window.modSystem = new ModSystem();
console.log('Hệ thống Mod Font đã khởi tạo (chỉ nhận .ttf/.otf/.woff/.woff2)!');
