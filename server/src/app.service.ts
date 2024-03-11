import { Injectable } from '@nestjs/common';
import { apiDescription } from './description/api';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDescription():string {
    return JSON.stringify(apiDescription);
  }
}
