import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../service/questions.service';



import Swal from 'sweetalert2';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit = false;
  timer:any;

  constructor(private locationStrategy: LocationStrategy,private _route:ActivatedRoute, private _question:QuestionsService) { }

  ngOnInit(): void {
    this.preventBackButton();

    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();

  }
  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe({
      next:(data:any)=>{
       this.questions =data;
       this.timer = this.questions.length *2 *60;
      //  this.questions.pipe(map((val: any) =>{
      //   return val.content.replace('<p>', '').replace('</p>', '');
      //  } )  

      //  );

      
      
       
       
       
       
     
       
       for (let index = 0; index < this.questions.length; index++) {
        this.questions[index].content = this.questions[index].content.replace('<p>', '').replace('</p>', '');
        
        }
      /* this.questions.forEach((q:any)=>{
         // iterqate all question and each question have answer  and we should put in key value pair
          q['givenAnswer'] = '';
        });*/
        // console.log(this.questions);
        this.starTimer();
      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire('Error','Error in loading question','error');
      }
    });
  }
    
// Define a function to handle back button and use anywhere
preventBackButton() {
  history.pushState(null, '' , location.href);
  this.locationStrategy.onPopState(() =>  {
    history.pushState(null, '' , location.href);
  });
 }

 submitQuiz(){
  Swal.fire({
    title: 'Do you want to submit the quiz',
    showCancelButton:true,
    confirmButtonText: 'Submit',
    icon: 'info',
  }).then((e:any) =>{
    if(e.isConfirmed){
      this.evalQuiz();
      
      // console.log("Correct Answers:"+ this.correctAnswer);
     // console.log("Marks Got " +this.marksGot);
     // console.log(this.attempted);

    }
  });
 }
 starTimer(){
  let t = window.setInterval(()=>{
    if(this.timer <=0 ){
      // it automatically submit quiz and show the result
      this.evalQuiz();
      // after timer reaches to 0:0:0 it ask for submi
      //this.submitQuiz();
      clearInterval(t);
    }else{
      this.timer--;
    }
  },1000)
 }

 getFormatedTime(){
  let hh =Math.floor(this.timer/3600);
  let mm = Math.floor(this.timer/60);
  let ss =this.timer-mm*60;
  return `${hh}hrs:${mm}min:${ss}sec`;
 }

 evalQuiz(){
 
  /*
      
  this.questions.forEach((q: any)=>{
   if(q.givenAnswer == q.answer){
    this.correctAnswer++;
    let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
      this.marksGot += marksSingle;
  }
  if(q.givenAnswer.trim() != ''){
    this.attempted++;
  }
  
 }); */
 this._question.evalQuiz(this.questions).subscribe({
  next:(data:any)=>{
   // console.log(data);
    this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
    this.correctAnswer= data.correctAnswer;
    this.attempted = data.attempted;
    this.isSubmit =true;
  },
  error:(err:any)=>{
    console.log(err);
  },
 });
}

printPage(){
  window.print();
}
}
