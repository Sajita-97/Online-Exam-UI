import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes:any=[];
  qid:any;


  constructor(private quiz:QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe({
      next:(data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      error: (err: any)=>{
        console.log(err);
           Swal.fire('Error !!' ,'Error in loading data','error');
      }
    });
  }
  deleteQuiz(qid:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this.quiz.deleteQuiz(qid).subscribe({
          next:(data:any)=>{
            this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qid!= qid)
                
            Swal.fire('Success!!' ,'Quiz Deleted','success');
           
        },
          error: (err: any)=>{
            
            Swal.fire('Error !!' ,'Error in deleting quiz','error');
          }
         });
      }
    });
   
  }

}
