"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const task_module_1 = require("../task.module");
class TaskStatusValidationPipes {
    constructor() {
        this.allowedStatuses = [
            task_module_1.TaskStatus.OPEN,
            task_module_1.TaskStatus.IN_PROGRESS,
            task_module_1.TaskStatus.DONE,
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValied(value)) {
            throw new common_1.BadRequestException(`"${value} is an invalid status"`);
        }
        return value;
    }
    isStatusValied(status) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
exports.TaskStatusValidationPipes = TaskStatusValidationPipes;
//# sourceMappingURL=task-status-validation.pipes.js.map