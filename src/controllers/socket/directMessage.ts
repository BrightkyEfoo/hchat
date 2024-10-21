import { io } from '../../app';
import prisma from '../../database/prisma';
import { SocketCacheService } from '../../services/socketCacheService';
import { ClientMessage } from '../../types/ClientData';
import { TIoType } from '../../types/io';

export default function (socket: TIoType) {
  const socketCacheService = new SocketCacheService();
  console.log("first")
  socket.on('mss', async (message: ClientMessage) => {
    console.log('message', message)
    const msg = await prisma.message.create({ data: message });


    const recieverSocketId = await socketCacheService.getUserSocket(msg.recieverId || message.recieverId)

    io.to(recieverSocketId).emit('message', msg)
  });
}
