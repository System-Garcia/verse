import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class LowercasePipe implements PipeTransform {
  constructor(private readonly fieldsToTransform: string[] = []) {}

  transform(value: any, metadata: ArgumentMetadata) {

    // If the metadata type is not body, return the value as is
    if(metadata.type !== 'body') {
      return value;
    }

    if(typeof value !== 'object' || value === null) {
      return value;
    }

    // If no fields are provided, transform all fields
    if (this.fieldsToTransform.length === 0 && metadata.type === 'body') {
      if (typeof value === 'object' && value !== null) {
        for (const key in value) {
          if (typeof value[key] === 'string') {
            value[key] = value[key].toLowerCase();
          }
        }
      }
      return value;
    }

    // If fields are provided, transform only those fields
    if(metadata.type === 'body') {
      for (const field of this.fieldsToTransform) {
        console.log('field', field);
        if(value[field] && typeof value[field] === 'string') {
          value[field] = value[field].toLowerCase();
        }
      }
      return value;
    }
  }
}
