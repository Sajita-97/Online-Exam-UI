import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
qid:any;
quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz: QuizService , private _snack:MatSnackBar,private _router:Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe({
      next:(data:any)=>{
        this.quiz=data;
      },
      error: (err:any)=>{
        console.log(err);
        this._snack.open('error in loading quiz' , '' ,{duration:3000,});
      }
    });
  }
  // start quiz
  public startQuiz(){
  
    Swal.fire({
      title: 'Do you want to start the quiz?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't start`,
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
      
        this._router.navigate(['/start/' +this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  

}
