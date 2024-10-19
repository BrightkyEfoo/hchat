import { RedisService } from "./redisService";

export class DirectMessageCacheService {
    public async storeMessage(userId:number, message:any) {
        await RedisService.lPush(`conversation:${userId}`, message);

        await RedisService.lTrim(`conversation:${userId}`, 0, 99);  // On garde dans le cache les 100 derniers messages
    }

    public async getMessages(userId:number) {
        const redis = await RedisService.getInstance();

        const messagesString = await redis.lRange(`conversation:${userId}`, 0, -1);  
           
        return messagesString.map((msg)=>(JSON.parse(msg)))
    }
}