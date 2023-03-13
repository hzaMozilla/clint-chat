import { HttpStatusCode, ErrorsMessages } from '@src/constants';
import { BaseError } from './base.error';
export class DatabaseError extends BaseError {
  constructor(description: string) {
    super(
      ErrorsMessages.INTERNAL_SERVER_ERROR,
      HttpStatusCode.INTERNAL_SERVER,
      description
    );
  }
}
