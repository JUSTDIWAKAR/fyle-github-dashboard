import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handle(error: any): void {
    if (error instanceof HttpErrorResponse) {
      const errorMsg =
        error.status === 0
          ? 'Server not reachable'
          : error?.message || 'Unknown error occurred';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMsg
      });
    } else {
      console.error('An error occurred:', error);
    }
  }
}
