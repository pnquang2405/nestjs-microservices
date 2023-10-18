import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ResponseService } from '../app/response.service';
import { ConfigModule } from '../app/config/config.module';
import { ArticleService } from '../app/config/article-service/order-service';

@Module({
  imports: [ConfigModule, ArticleService.registerService()],
  providers: [ArticleService, ResponseService],
  controllers: [ArticlesController],
})
export class ArticleModule {}
