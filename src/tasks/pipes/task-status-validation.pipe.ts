import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Console } from "console";
import{TaskStatus} from '../task-status.enum';
export class TaskStatusValidationPipe implements PipeTransform{
transform( value:any,metadata:ArgumentMetadata){
console.log('value',value);
console.log('metadata',metadata);
    return value;
}
}