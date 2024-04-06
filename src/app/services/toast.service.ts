import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  type! : 'success' | 'error' | 'info' | 'warning'

  defaultOptions : any = {
    timeOut : 2000,
    progressBar : true,
    positionClass: 'toast-bottom-right'
  }

  constructor( private toastr : ToastrService ) { }

  create( type : 'success' | 'error' | 'info' | 'warning', title : string | undefined, message? : string | undefined, options? : any ) {
    options = options ?? this.defaultOptions;
    switch (type) {
      case 'success':
        this.toastr.success(message, title, options);
        break;
    
      case 'error':
        this.toastr.error(message, title, options);
        break;

      case 'info':
        this.toastr.info(message, title, options);
        break;

      case 'warning':
        this.toastr.warning(message, title, options);
        break;
    }
  }
  
}
