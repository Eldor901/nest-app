import {TaskStatus} from "../task.module";
import {IsNotEmpty, IsOptional} from "class-validator";


export class GetTasksFilterDto {

    @IsOptional()
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}