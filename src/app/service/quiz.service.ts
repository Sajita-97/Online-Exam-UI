import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
   public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
   }
   public deleteQuiz(qid:any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
   }
   // get single quiz
   public getQuiz(qId:any){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
   }
   // update quiz
   public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
   }
    // get quiz basedon category
    public getQuizzesOfcategory(cid:any){
      return this.http.get(`${baseUrl}/quiz/category/${cid}`);
    }
    //get active quizzes
    public getActiveQuizzes(){
      return this.http.get(`${baseUrl}/quiz/active`);
    }
    public getActiveQuezzesOfcategory(cid:any){
      return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
    }
   }

