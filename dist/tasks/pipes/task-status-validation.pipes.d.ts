import { PipeTransform } from '@nestjs/common';
import { TaskStatus } from "../task.module";
export declare class TaskStatusValidationPipes implements PipeTransform {
    readonly allowedStatuses: TaskStatus[];
    transform(value: any): any;
    private isStatusValied;
}
