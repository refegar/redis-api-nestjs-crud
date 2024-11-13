import { Module } from '@nestjs/common';
import { OrdersServiceController } from './orders-service.controller';
import { OrdersServiceService } from './orders-service.service';
import { RedisService } from 'src/common/services/redis.service';

@Module({
  controllers: [OrdersServiceController],
  providers: [OrdersServiceService,RedisService
 
  ]
})
export class OrdersServiceModule {}
