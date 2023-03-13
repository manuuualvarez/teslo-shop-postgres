import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwTPayload } from '../auth/interfaces/jwt-payload.interface';


@WebSocketGateway(8080,{ cors: true })
export class MessagesWsGateway implements  OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
    ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwTPayload;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      client.disconnect();
      return;
    }

    console.log({ payload })

    this.messagesWsService.registerClient(client);
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
  }

  @SubscribeMessage('message-from-client') 
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    //! This emit is only for the client that sent the message, NOT FOR ALL
    // client.emit('message-from-server', payload);

    //! This emit is for all clients, missing the client that sent the message
    // client.broadcast.emit('message-from-server', payload);

    //! This emit is for all clients, including the client that sent the message
    this.wss.emit('message-from-server', payload);
  }

}
