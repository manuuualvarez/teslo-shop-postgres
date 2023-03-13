import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: User
    }
}


@Injectable()
export class MessagesWsService {
    private connectClients: ConnectedClients = {};

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async registerClient(client: Socket, uid: string) {
        const user = await this.userRepository.findOneBy({ uid: uid });

        if(!user) throw new Error('User not found');
        if (!user.isActive) throw new Error('User is not active');
        this.checkUserConnection(user);

        this.connectClients[client.id] = {
            socket: client,
            user: user
        }
        // console.log(`Client ${client.id} connected. Total clients: ${this.getConnectedClients()}`);
    }

    removeClient(clientId: string) {
        delete this.connectClients[clientId];
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectClients);
    }

    getUserFullNameBySocketId(socketId: string){
        return this.connectClients[socketId].user.firstName + ' ' + this.connectClients[socketId].user.lastName;
    }


    private checkUserConnection(user: User) {
        for (const clientId of Object.keys(this.connectClients)) {
            const connectedClient = this.connectClients[clientId];

            if(connectedClient.user.uid === user.uid) {
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
}
