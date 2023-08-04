import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../service/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
categories:any=[
  
];
quizData:any=
  {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };

  constructor(private category:CategoryService , private _snack:MatSnackBar,private _quiz:QuizService ) { }

  ngOnInit(): void {
    this.category.categories().subscribe({
      next:(data:any)=>{
        // category load
        this.categories = data;
       // console.log(this.categories);
        
      },
      error: (err: any)=>{
        // console.log(err);
         Swal.fire('Error !!' ,'Error in loading data','error');
      }
    });
  }
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title == null){
      this._snack.open('Title Required' ,'',{
        duration:3000,
      });
      return;
    }
    //server
    this._quiz.addQuiz(this.quizData).subscribe(
      {
        next:(data:any)=>{
          
          Swal.fire('Success!!' ,'Quiz Added Successfully','success');
         this.quizData =
         {
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
           },
        };
      },
        error: (err: any)=>{
          console.log(err);
          Swal.fire('Error !!' ,'Error in loading data','error');
        }
      }
    );

  }
}
