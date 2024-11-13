import { Module } from '@nestjs/common';
import { OrdersRetrieverServiceController } from './orders-retriever-service.controller';
import { OrdersRetrieverServiceService } from './orders-retriever-service.service';
import { connection } from 'src/common/constatnts/connection';
import { RedisService } from 'src/common/services/redis.service';


@Module({
 
  controllers: [OrdersRetrieverServiceController],
  providers: [OrdersRetrieverServiceService,RedisService, {
    provide: 'CONNECTION',
    useValue: connection,
  },]
})
export class OrdersRetrieverServiceModule {}
