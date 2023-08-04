import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
catId:any;
quizzes:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
   // it subscribe all parameter,when router is changes it show required component
    this._route.params.subscribe((params:any)=>{
      this.catId = params.catId;
      if(this.catId == 0){
        console.log('load all quizzes');
        this._quiz.getActiveQuizzes().subscribe({
          next:(data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
          },
          error:(err:any)=>{
            this._snack.open('error in loading quiz','',{
              duration:3000,
            });
          }
        });
      }
      else{
        console.log("load only selected quizzes");
        this._quiz.getActiveQuezzesOfcategory(this.catId).subscribe
        ({
          next:(data:any)=>{
            this.quizzes=data;
            
          },
          error:(err:any)=>{
            this._snack.open('error in loading quiz','',{
              duration:3000,
            });
          }
        });
      }
    });
    
  }

}
