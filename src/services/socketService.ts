import { io } from "../app";
import { genModel, Messages } from "../database/models/message";
import { User } from "../database/models/users";

export default class socketService{

    constructor(){
        io.on('ack:message-1',async (msg: ReturnType<typeof genModel>) => {
            // update le message avec son id, le recievedAt
            await Messages.update()
            const sender = await User.findByPk(msg.senderId)

            io.to(sender!.socketId).emit('ack:message-1', msg)

        })

        io.on('ack:message-2', async (msg: ReturnType<typeof genModel>) => {
            // update le message avec son id, le seenAt
            await Messages.update()
            const sender = await User.findByPk(msg.senderId)

            io.to(sender!.socketId).emit('ack:message-2', msg)

        })
    }
}