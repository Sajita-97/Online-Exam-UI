import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../service/questions.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
qId:any;
qTitle:any;
questions:any=[];
  constructor(private _route:ActivatedRoute,private _question:QuestionsService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle =  this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe({
      next:(data:any)=>{
       // console.log(data);
        this.questions=data;
      },
      error:(err:any)=>{

      }
    });

 
   
  }
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure, want to delete this question?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          {
            next:(data:any)=>{
              this._snack.open('Question Deleted','',{duration:3000,});
              this.questions = this.questions.filter((q:any)=>q.quesId!= qid)
                  
             
             
          },
            error: (err: any)=>{
              
             this._snack.open('Error in deleting Question','',{duration:3000,});
            }
           });
        }
      });
     
    }
  
  }
          

          

      
  
  
  




