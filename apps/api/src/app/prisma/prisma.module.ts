import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaAppModule {}
