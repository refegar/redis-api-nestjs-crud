import { 
    Controller,
    Post,
    HttpException,
    HttpStatus,
    Body,
  } from '@nestjs/common';
  import { OrdersServiceService } from './orders-service.service';
  import { CreateServiceDTO } from './dto/create-orders-dto';
  
  @Controller('orders-service')
  export class OrdersServiceController {
    constructor(private ordersServiceService: OrdersServiceService) {}
  
    @Post()
    async create(@Body() createServiceDTO: CreateServiceDTO) {
      try {
        // Aquí esperamos la promesa que devuelve el servicio
        const newOrder = await this.ordersServiceService.create(createServiceDTO);
        return {
          message: 'Pedido creado con éxito',
          data: newOrder
        };
      } catch (error) {
        throw new HttpException('Error del servidor al crear pedido', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  