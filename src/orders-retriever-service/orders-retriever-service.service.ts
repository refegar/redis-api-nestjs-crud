import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/common/services/redis.service';

@Injectable()
export class OrdersRetrieverServiceService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  // Método para obtener todos los pedidos
  async findAll() {
    const orders = await this.redisService.getAllOrders();
    return orders;
  }
}
