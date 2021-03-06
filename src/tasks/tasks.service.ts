import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import {CreateTaskDto} from'./dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import{Task}from'./task.entity';
import{TaskStatus} from'./task-status.enum';
@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository)
    private taskRepository:TaskRepository,){
    }


     async  getTasks(filterdto:GetTasksFilterDto):Promise<Task[]>{
    return this.taskRepository.getTasks(filterdto);
    }
 
    async getTaskById(id:number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);  
          if(!found){
         throw new NotFoundException('Task with ID not found');
     }
     return found; 
    }

    async  CreateTask(createTaskDto:CreateTaskDto):Promise<Task>{
      return this.taskRepository.CreateTask(createTaskDto);
    }

    async  deleteTaskById(id:number): Promise<void>{
        const result= await this.taskRepository.delete(id);
       if(result.affected===0){
        throw new NotFoundException('Task with ID not found');
       }
    }
    async UpdateTaskStatus(id:number,status:TaskStatus):Promise<Task>{
          const task=  await this.getTaskById(id);
            task.status=status;
            await task.save();
            return task;
    }
    
}
