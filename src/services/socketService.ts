import { io } from "../app";
import ack from "../controllers/socket/ack";
import { genModel, Messages } from "../database/models/message";
import { User } from "../database/models/users";

export default class socketService{

    private constructor(){
        ack(io)
    }
}