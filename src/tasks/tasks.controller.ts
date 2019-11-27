import {Body, Controller, Get, Param, Post, Delete, Req, Patch, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { Request } from 'express';
import {TasksService} from './tasks.service';
import {Task, TaskStatus} from './task.module';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TaskStatusValidationPipes} from "./pipes/task-status-validation.pipes";

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length)  {
            return this.tasksService.getTasksWithFilter(filterDto);
        }
        else {
            return this.tasksService.getAllTasks();
        }
        return this.tasksService.getAllTasks();
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    CreateTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.CreateTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
                     @Body('status', TaskStatusValidationPipes) status: TaskStatus):Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
