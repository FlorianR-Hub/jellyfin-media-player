class jmpOSDPlugin {
    constructor() {
        this.name = 'JMP OSD Plugin';
        this.type = 'input';
        this.id = 'jmpOSDPlugin';

        // Override setTimeout to change OSD hide timing from 3000ms to 1000ms
        this.initOSDControl();
    }

    initOSDControl() {
        // Store the original setTimeout function
        const originalSetTimeout = window.setTimeout;
        
        // Override setTimeout globally
        window.setTimeout = function(callback, delay, ...args) {
            // If the delay is 3000ms (OSD auto-hide), change it to 1000ms
            if (delay === 3000) {
                console.log('JMP OSD Plugin: Changing OSD timeout from 3000ms to 1000ms');
                return originalSetTimeout(callback, 1000, ...args);
            }
            return originalSetTimeout(callback, delay, ...args);
        };

        console.log('JMP OSD Plugin: OSD timeout override initialized');
    }
}

// Register the plugin
window._jmpOSDPlugin = jmpOSDPlugin;

// Initialize immediately when the script loads
if (window.document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        new jmpOSDPlugin();
    });
} else {
    // Document already loaded
    new jmpOSDPlugin();
}
