import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }



  // add user
  public addStudent(student:any){
    var header = new HttpHeaders({'Content-Type': 'application/json'});
   return this.http.post(`${baseUrl}/student/`,JSON.stringify(student),{ headers: header });
  }
  public getAllStudents():Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}/student/all`);
}
public uploadImage(){
  
}
}
