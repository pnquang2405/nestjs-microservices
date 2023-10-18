import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, ProductDto } from '@nestjs-microservices/shared/dto';
import { Observable, map, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Welcome to products-microservice!' };
  }

  async createProduct(
    createProduct: CreateProductDto
  ): Promise<{ message: string }> {
    await this.prisma.product.create({
      data: createProduct,
    });

    return { message: 'successful' };
  }

  async getProducts(): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany();

    const productDtos: ProductDto[] = products.map((product) => ({
      name: product.name,
      price: product.price,
    }));

    return productDtos;
  }

  async getOne(id: number): Promise<Observable<{ message: unknown }>> {
    let idProduct = 0;
    idProduct = typeof id === 'number' ? id : parseInt(id);
    return of(
      await this.prisma.product.findUnique({
        where: { id: idProduct },
      })
    ).pipe(
      map((product) => {
        if (!product) {
          return { message: 'Product not found' };
        }

        const productDto = {
          id: product.id,
          name: product.name,
        };

        return { message: productDto };
      })
    );
  }
}
