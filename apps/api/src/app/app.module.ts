import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaAppModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PrismaAppModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
