import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from '@nestjs-microservices/shared/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('create-product')
  async createProduct(@Ctx() context: KafkaContext) {
    const { value } = context.getMessage();
    const productDto = value as unknown as CreateProductDto;

    return await this.appService.createProduct(productDto);
  }

  @MessagePattern('get-products')
  async getProducts() {
    return await this.appService.getProducts();
  }

  @MessagePattern('get-one')
  async getOne(@Ctx() context: KafkaContext) {
    const { value } = context.getMessage();
    const id = value as unknown as number;

    return await this.appService.getOne(id);
  }
}
