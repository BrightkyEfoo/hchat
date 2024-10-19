import { Prisma } from "@prisma/client";
import prisma from "../../database/prisma";
import { TIoType } from "../../types/io";
import { SocketCacheService } from "../../services/socketCacheService";

export default function(io:TIoType) {
    const socketCacheService = new SocketCacheService;
     // Quand le msg a ete envoyé
    io.on('send_direct_message', async (msg: any) => {
        const now = new Date()
        await prisma.message.update({
            where: {id: msg.id},
            data: {sentAt:now}
        })

        socketCacheService.setMessageAck(msg.senderId, msg.id, 'SENT');        
        const senderSocketId = await socketCacheService.getUserSocket(msg.senderId);
        io.to(senderSocketId).emit('ack:message-0', msg);
    });

    // Quand le msg a ete recu
    io.on('ack:message-1',async (msg: any) => {
        // update le message avec son id, le recievedAt
        const now = new Date()
        await prisma.message.update({
            where: {id: msg.id},
            data: {recievedAt:now}
        })

        socketCacheService.setMessageAck(msg.senderId, msg.id, 'RECEIVED');        
        const senderSocketId = await socketCacheService.getUserSocket(msg.senderId);
        io.to(senderSocketId).emit('ack:message-1', msg);
    })

    // Quand le msg est ouvert!vu
    io.on('ack:message-2', async (msg: any) => {
        // update le message avec son id, le seenAt
         const now = new Date()
         await prisma.message.update({
             where: {id: msg.id},
             data: {seenAt:now}
         })
 
         socketCacheService.setMessageAck(msg.senderId, msg.id, 'SEEN');         
         const senderSocketId = await socketCacheService.getUserSocket(msg.senderId);
        io.to(senderSocketId).emit('ack:message-2', msg)

    })
}   
