import { EntityRepository,Repository } from 'typeorm';
import {Task} from './task.entity';
import {CreateTaskDto} from'./dto/create-task.dto';
import{TaskStatus} from './task-status.enum'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterdto:GetTasksFilterDto):Promise<Task[]>{
    const {status,search}=filterdto;
    const query=this.createQueryBuilder('task');
    const tasks = await query.getMany();
    return tasks;
   }
 async CreateTask(createTaskDto:CreateTaskDto):Promise<Task>{
    const {title,description} = createTaskDto;
    const task = new Task();
    task.title=title;
    task.description=description;
    task.status = TaskStatus.OPEN;
     await task.save();
     return task;
 }
}