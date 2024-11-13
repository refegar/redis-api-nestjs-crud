import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  // Método para guardar un objeto en Redis
  async set(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  // Método para obtener un objeto desde Redis
  async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return value ? JSON.parse(value) : null;
  }

    // Método para eliminar un pedido de Redis
    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
      }
      
  // Método para obtener todas las claves que empiecen con 'order:'
  async getAllOrders(): Promise<any[]> {
    const keys = await this.redisClient.keys('order:*');
    const orders = [];

    for (const key of keys) {
      const order = await this.get(key);
      if (order) {
        orders.push({ id: key, ...order });
      }
    }

    return orders;
  }
}
