import { 
    Controller, 
    Get,
    HttpException,
    HttpStatus 
  } from '@nestjs/common';
  import { OrdersRetrieverServiceService } from './orders-retriever-service.service';
  
  @Controller('orders-retriever-service')
  export class OrdersRetrieverServiceController {
    constructor(private ordersRetrieverServiceService: OrdersRetrieverServiceService) {}
  
    @Get()
    async findAll() {
      try {
        const orders = await this.ordersRetrieverServiceService.findAll();
        return {
          message: 'Pedidos obtenidos con éxito',
          data: orders
        };
      } catch (error) {
        throw new HttpException('Error del servidor al obtener pedidos', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  