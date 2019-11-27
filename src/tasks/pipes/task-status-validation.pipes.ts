import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {TaskStatus} from "../task.module";

export class TaskStatusValidationPipes implements PipeTransform {
    readonly allowedStatuses = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];

    transform(value: any)  {
        value = value.toUpperCase();

        if(!this.isStatusValied(value))  {
            throw new BadRequestException(`"${value} is an invalid status"`);
        }

        return value;
    }

    private isStatusValied(status: any)
    {
        const  idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
