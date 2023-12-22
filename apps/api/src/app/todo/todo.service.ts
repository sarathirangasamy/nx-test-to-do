import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodo(id: string) {
    return await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async getTodoList(take: number, skip: number) {
    return await this.prisma.todo.findMany({
      where: {
        archived: false,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      take: take,
      skip: skip,
    });
  }

  async createTodo(name: string) {
    return await this.prisma.todo.create({
      data: {
        name: name,
      },
    });
  }

  async deleteTodo(id: string) {
    return await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        archived: true,
      },
    });
  }

  async updateTodo(id: string, name: string) {
    return await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        name: name,
      },
    });
  }
}
