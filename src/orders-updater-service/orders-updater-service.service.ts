import { Injectable } from '@nestjs/common';
import { CreateServiceDTO } from 'src/orders-service/dto/create-orders-dto';
import { RedisService } from 'src/common/services/redis.service';

@Injectable()
export class OrdersUpdaterServiceService {
  constructor(private readonly redisService: RedisService) {}

  // Método para actualizar un pedido
  async update(id: string, recordToUpdate: CreateServiceDTO): Promise<any> {
    const existingOrder = await this.redisService.get(id);

    if (!existingOrder) {
      console.log(`Pedido con ID ${id} no encontrado`);
      return null;
    }

    const updatedOrder = {
      ...existingOrder,
      ...recordToUpdate,
    };

    await this.redisService.set(id, updatedOrder);
    console.log('Actualización exitosa:', updatedOrder);
    return updatedOrder;
  }

  // Método para eliminar un pedido
  async remove(id: string): Promise<void> {
    const existingOrder = await this.redisService.get(id);

    if (!existingOrder) {
      console.log(`Pedido con ID ${id} no encontrado`);
      return;
    }

    await this.redisService.delete(id);
    console.log(`Pedido con ID ${id} eliminado exitosamente`);
  }
}
