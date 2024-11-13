import { Injectable } from '@nestjs/common';
import { CreateServiceDTO } from './dto/create-orders-dto';
import { RedisService } from 'src/common/services/redis.service'; 

@Injectable()
export class OrdersServiceService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  // Método para crear un pedido
  async create(serviceDTO: CreateServiceDTO): Promise<any> {
    const orderId = `order:${new Date().getTime()}`;
    
    // Crear un objeto de pedido
    const order = {
      id: orderId,
      nombre: serviceDTO.nombre,
      categoria: serviceDTO.categoria,
      precio: serviceDTO.precio,
      cantidad: serviceDTO.cantidad,
    };

    // Guardar el pedido en Redis
    await this.redisService.set(orderId, order);
    console.log('Pedido guardado en Redis:', orderId, order);
    
    // Retornar el pedido creado
    return order;
  }

  // Método para obtener un pedido por ID
  async getOrderById(orderId: string): Promise<any> {
    const order = await this.redisService.get(orderId);
    if (order) {
      console.log('Pedido encontrado en Redis:', order);
    } else {
      console.log('Pedido no encontrado');
    }
    return order;
  }
}
