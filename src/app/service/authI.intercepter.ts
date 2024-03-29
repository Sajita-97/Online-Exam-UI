
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent,  HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


//const TOKEN_HEADER='Authorization';
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private login:LoginService){}
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add jwt token(localStorage prest) in request gytberb
   
const TOKEN_HEADER='Authorization';
debugger;
     let authReq=httpRequest;
    const token = this.login.getToken();
    if(token!=null){
     authReq= authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
    }

    return next.handle(authReq);
  }
}
export  const authInterceptorProvider=[{
    provide:HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true,
},];
