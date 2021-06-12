import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import{TasksService}from'./tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';


@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService:TasksService){ }
    
    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto):Promise< Task []>{
     return this.tasksService.getTasks(filterDto);
    }
    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id:number):Promise <Task>{
        return this.tasksService.getTaskById(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() CreateTaskDto:CreateTaskDto
    ):Promise<Task>{
     return this.tasksService.CreateTask(CreateTaskDto);
    }
    @Delete('/:id')
    deleteTaskById(@Param('id',ParseIntPipe) id:number):Promise <void>{
    return  this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id')
    updateTaskStatus(
       @Param('id',ParseIntPipe) id:number,
       @Body('status',TaskStatusValidationPipe) status:TaskStatus,
    ):Promise<Task>{
    return this.tasksService.UpdateTaskStatus(id,status);
    }
}
