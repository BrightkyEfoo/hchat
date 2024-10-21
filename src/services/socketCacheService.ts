import { TAckStatusTypes } from "../types/ackTypes";
import { RedisService } from "./redisService";

export class SocketCacheService {
    public async setUserSocket(userId:number, socketId:string | null) {
        await RedisService.setValue(`user:${userId}:socket-id`, socketId);
    }

    public async getUserSocket(userId:number) {
        return await RedisService.getValue(`user:${userId}:socket-id`);
    }

    public async removeUserSocket(userId:number) {
        const redis = await RedisService.getInstance();
        await redis.del(`user:${userId}:socket-id`);  
    }

    public async setMessageAck(userId:number, messageId:number, status:TAckStatusTypes) {
        await RedisService.setValue(`user:${userId}:message:${messageId}:status`, status);
    }

    public async getMessageAck(userId:number, messageId:number) {
        return await RedisService.getValue(`user:${userId}:message:${messageId}:status`);
    }
}