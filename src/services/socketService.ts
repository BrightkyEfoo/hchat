import ack from "../controllers/socket/ack";
import connection from "../controllers/socket/connection";
import directMessage from "../controllers/socket/directMessage";
import { TIoType } from "../types/io";
import { AppError } from "../utils/Errors/AppError";
import verifyJWT from "../utils/verifyJWT";


export default class SocketService{

    constructor(io : any){
        io.use((socket, next) => {

            const token = socket.handshake.headers.token as string

            const tokenValidationResponse = verifyJWT(token)

            if (tokenValidationResponse.isValid) {
                // @ts-ignore
                socket.JWTData = tokenValidationResponse.data

                next()
            } else {
                next(new AppError(
                    'NOT_AUTHORIZED',
                    'Unauthorised',
                    true,
                ))
            }
        })
        connection(io)
    }

    bind(socket: TIoType){
       
        ack(socket)

        directMessage(socket)
    }
}

