import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';


interface ConnectedClients {
    [id: string]: Socket
}


@Injectable()
export class MessagesWsService {
    private connectClients: ConnectedClients = {};

    registerClient(client: Socket) {
        this.connectClients[client.id] = client;
        // console.log(`Client ${client.id} connected. Total clients: ${this.getConnectedClients()}`);
    }

    removeClient(clientId: string) {
        delete this.connectClients[clientId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectClients);
    }
}
