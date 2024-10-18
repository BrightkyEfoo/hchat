import { createClient } from 'redis';

let client:any;

const initRedisClient = async () => {
    if(!client){
        client = createClient();
        client.on("error", ()=> console.log("Error creating redis client"));
    }
    try{
        await client.connect();
    } catch(error:any){
        console.log("Error occured while initializing redis client");
        throw error;
    }
}

const getValue = async (key:any) => {
    try {
        const value = await client.json.get(`${key}`);
        return value;
    } catch (error:any) {
        console.log("Error occured while getting value for key:", key);
        throw error;
    }
}

const setValue = async (key:any, value:any) => {
    try {
        const data = await client.set(`${key}`, "$",value);        
        return data;
    } catch (error:any) {
        console.log("Error occured while setting value for key:", key);
        throw error;
    }
}

const redisService = {
    initRedisClient,
    getValue,
    setValue
}

export { redisService };

