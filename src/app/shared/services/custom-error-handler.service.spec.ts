import { CustomErrorHandlerService } from './custom-error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('CustomErrorHandlerService', () => {
  let service: CustomErrorHandlerService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['add']);
    service = new CustomErrorHandlerService(messageService);
  });

  it('should call messageService.add with error message if HttpErrorResponse', () => {
    const httpError = new HttpErrorResponse({ status: 404 });
    service.handle(httpError);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Http failure response for (unknown url): 404 undefined'
    });
  });

  it('should call messageService.add with "Server not reachable" if HttpErrorResponse status is 0', () => {
    const httpError = new HttpErrorResponse({ status: 0 });
    service.handle(httpError);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Server not reachable'
    });
  });

  it('should console error if not HttpErrorResponse', () => {
    spyOn(console, 'error');
    const error = new Error('Test error');
    service.handle(error);
    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });
});
