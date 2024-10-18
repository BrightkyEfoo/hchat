import { createClient } from 'redis';

class RedisService {
    private static instance: any;

    private constructor() {}

    public static getInstance(): any {
        if (!RedisService.instance) {
            RedisService.instance = createClient();
            RedisService.instance.on("error", () => console.log("Error creating redis client"));
        }
        return RedisService.instance;
    }

    public static async connect(): Promise<void> {
        await this.getInstance().connect();
    }

    public static async getValue(key: string): Promise<any> {
        const client = this.getInstance();
        try {
            const value = await client.get(key); // Change to get for standard key-value pairs
            return JSON.parse(value || 'null'); // Assuming stored values are JSON strings
        } catch (error: any) {
            console.log(`Error occurred while getting value for key: ${key}`);
            throw error;
        }
    }


    public static async setValue(key: string, value: any): Promise<void> {
        const client = this.getInstance();
        try {
            await client.set(key, JSON.stringify(value));
        } catch (error: any) {
            console.log(`Error occurred while setting value for key: ${key}`);
            throw error;
        }
    }
}

// Usage example
async function main() {
    const redisService = RedisService.getInstance();

    // Connect to Redis
    await redisService.connect();

    // Set a value
    await redisService.setValue("myKey", { name: "John Doe" });

    // Get a value
    const value = await redisService.getValue("myKey");
    console.log(value);
}

// Call the main function for execution
// main().catch(console.error);