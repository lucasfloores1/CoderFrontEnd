import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor ( private toastService : ToastService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe( catchError( error => {
      let errorMessage = ""
      errorMessage = error.error.message           
      this.toastService.create('error', 'Error', errorMessage);   
      return throwError( () => errorMessage )
    }));
  }
  
};
