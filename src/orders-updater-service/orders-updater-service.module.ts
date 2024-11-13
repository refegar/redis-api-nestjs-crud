import { Module } from '@nestjs/common';
import { OrdersUpdaterServiceController } from './orders-updater-service.controller';
import { OrdersUpdaterServiceService } from './orders-updater-service.service';
import { connection } from 'src/common/constatnts/connection';
import { RedisService } from 'src/common/services/redis.service';


@Module({
  controllers: [OrdersUpdaterServiceController],
  providers: [OrdersUpdaterServiceService,RedisService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ]
})
export class OrdersUpdaterServiceModule {}
