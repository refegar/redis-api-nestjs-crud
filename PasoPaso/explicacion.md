## Creacion en common/services/redis.services.ts
```ts
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

```

## cargar en app.modulo

## mirar en la parte de provider
```ts
import { 
  MiddlewareConsumer,
  Module,
  NestModule,
 } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { OrdersServiceController } from './orders-service/orders-service.controller';
import { OrdersServiceModule } from './orders-service/orders-service.module';
import { OrdersRetrieverServiceModule } from './orders-retriever-service/orders-retriever-service.module';
import { OrdersUpdaterServiceModule } from './orders-updater-service/orders-updater-service.module';
import { DevConfigService } from './common/providers/DevConfigService';
import { RedisService } from './common/services/redis.service'; 


const devConfig = { port: 3000 };
const proConfig = { port: 4000 };
@Module({
  imports: [
    OrdersServiceModule,
     OrdersRetrieverServiceModule,
      OrdersUpdaterServiceModule],
  controllers: [AppController],
  providers: [AppService, RedisService, {
```

## por ultimo revisar su relaciones en tosdos su modulos con que se trabaja los datos 
## osea module,service,controller y listo