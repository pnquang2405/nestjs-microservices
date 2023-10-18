import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentModule } from '../payment/payments.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ArticleModule } from '../article/articles.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    PaymentModule,
    ConfigModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
