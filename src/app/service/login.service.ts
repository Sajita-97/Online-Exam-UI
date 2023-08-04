import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders } from '@angular/common/http';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject =new Subject<boolean>();

  constructor(private http:HttpClient) { }
  // get current user data
  public getCurrentUser(){
    debugger;
    return this.http.get(`${baseUrl}/current-user`);
  }



  public generateToken(loginData:any){
    var header = new HttpHeaders({'Content-Type': 'application/json'});
   return this.http.post(`${baseUrl}/generate-token` ,loginData,{ headers: header });
  }

  // Login user set token in localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
   
    
    console.log("Token " + localStorage.getItem('token'))
    return true;
  }
   // user is login or not
   public isLoggedIn(){
    debugger;
    let tokentStr = localStorage.getItem('token');
    if(tokentStr == undefined || tokentStr == '' || tokentStr == null){
      return false;
    }
    else{
      return true;
    }
   }

   // logOut
   public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
   }
   // get token
   public getToken(){
    debugger;
    return localStorage.getItem('token');
   }

   // set userDetails
   public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
   }
   //get UserDetails
   public getUser(){
    debugger;
    let userStr=localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
   }
   // get role
   public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;

   }
}
