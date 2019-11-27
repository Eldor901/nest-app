import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {clearScreenDown} from "readline";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})

export class TasksModule {}