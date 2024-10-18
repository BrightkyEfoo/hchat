import { createClient } from 'redis';

class RedisService {
  private static instance: ReturnType<typeof createClient>;

  private constructor() {}

  public static async getInstance(): Promise<ReturnType<typeof createClient>> {
    if (!RedisService.instance) {
      RedisService.instance = createClient();
      await RedisService.instance.connect();

      RedisService.instance.on('error', () =>
        console.log('Error creating redis client')
      );
    }
    return RedisService.instance;
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
    const client = await this.getInstance();
    try {
      await client.set(key, JSON.stringify(value));
    } catch (error: any) {
      console.log(`Error occurred while setting value for key: ${key}`);
      throw error;
    }
  }

//   LPush
//   LTrim

}
