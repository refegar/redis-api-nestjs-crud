import { 
  Controller, 
  Put, 
  Delete, 
  Param, 
  Body, 
  ParseIntPipe, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { OrdersUpdaterServiceService } from './orders-updater-service.service';
import { CreateServiceDTO } from 'src/orders-service/dto/create-orders-dto';

@Controller('orders-updater-service')
export class OrdersUpdaterServiceController {
  constructor(private ordersUpdaterService: OrdersUpdaterServiceService) {}

  // Endpoint para actualizar un pedido
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDTO: CreateServiceDTO,
  ) {
    try {
      const updatedOrder = await this.ordersUpdaterService.update(id, updateOrderDTO);
      if (!updatedOrder) {
        throw new HttpException('Pedido no encontrado', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Pedido actualizado con éxito',
        data: updatedOrder,
      };
    } catch (error) {
      throw new HttpException('Error al actualizar el pedido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Endpoint para eliminar un pedido
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.ordersUpdaterService.remove(id);
      return {
        message: `Pedido con ID ${id} eliminado con éxito`,
      };
    } catch (error) {
      throw new HttpException('Error al eliminar el pedido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
