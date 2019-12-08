import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class UserSetingsValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): void;
}
