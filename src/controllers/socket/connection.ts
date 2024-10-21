import { socketService } from "../../app";
import prisma from "../../database/prisma";
import { SocketCacheService } from "../../services/socketCacheService";
import { TIoType } from "../../types/io";

export default function (io: TIoType) {
    const socketCacheService = new SocketCacheService;
    // Quand le user se connecte, il nous fourni son token comme ca : {auth : {token : token}}
    io.on('connect', async (socket) => {

        // @ts-ignore
        const JWTData = socket.JWTData

        const user = await prisma.user.findFirstOrThrow({where : {id : JWTData.userId}})

        console.log('user', user)

        socketCacheService.setUserSocket(user.id, socket.id)

        socket.on('disconnect', async (socket) => {
            // @ts-ignore
            const JWTData = socket.JWTData

            const user = await prisma.user.findFirstOrThrow({ where: { id: JWTData.userId } })

            socketCacheService.setUserSocket(user.id, null)
        });

        socketService.bind(socket)

        clg


    });

    

}   
