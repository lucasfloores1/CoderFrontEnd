import { Provider } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlerInterceptor } from "../interceptors/error-handler.interceptor";

export const errorHandlerProvider : Provider = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorHandlerInterceptor,
    multi: true
}