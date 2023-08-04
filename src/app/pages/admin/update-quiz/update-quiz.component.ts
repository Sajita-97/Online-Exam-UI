import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { QuizService } from '../../../service/quiz.service';
import { CategoryService } from '../../../service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  
  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _cat:CategoryService,private router:Router) { }
 
  qId = 0;
 quiz:any;
 categories:any;
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
   // alert(this.qId);
   this._quiz.getQuiz(this.qId).subscribe({
    next:(data:any)=>{
      this.quiz=data;
     // console.log(this.quiz);
    },
    error: (err: any)=>{
       console.log(err);
    }
   });
      this._cat.categories().subscribe({
        next:(data:any)=>{
          this.categories = data;
        },
        error: (err: any)=>{
          alert('error in load category');
       }
      });
  }
  //update form submit
  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe({
      next:(data:any)=>{
        Swal.fire('Success!!','quiz updated','success').then((e)=>{
          this.router.navigate(['/admin/quizzes']);
        });
     
      },
      error:(err:any)=>{
        Swal.fire('Error!!','error in lupdating quiz','error');
      }
    });
  }

}
