const WebSocket = require('ws');

let sNotificationService;

class NotificationService {
    constructor() {
        if (!sNotificationService) {
            sNotificationService = this;
        }
        return sNotificationService;
    }
    init() {
        this.wss = new WebSocket.Server({ port: 3010 });
    }
    broadcast(type, content) {
        this.wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type, content }));
            }
        });
    }
}

module.exports = NotificationService;
