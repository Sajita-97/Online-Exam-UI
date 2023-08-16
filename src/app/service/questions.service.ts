import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) { }
  // get all questionsOfQuiz
  public getQuestionsOfQuiz(qid:any){
   return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  public getQuestionsOfQuizForTest(qid:any):Observable<any>{
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
   }
  // post all question
  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/`,question);
  }
  // delete question
  public deleteQuestion(quesId:any){
    return this.http.delete(`${baseUrl}/question/${quesId}`);

  }
  // eval quiz
  public evalQuiz(questions:any){
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
