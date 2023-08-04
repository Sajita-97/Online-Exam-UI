import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { QuestionsService } from '../../../service/questions.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId:any;
  qTitle:any;
  question:any = {
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  constructor(private _route:ActivatedRoute,private _question:QuestionsService,private _router:Router) { }

  ngOnInit(): void {
    // here qid is routing qid
    // here qid is routing qid
   this.qId = this._route.snapshot.params['qid'];
   this.qTitle = this._route.snapshot.params['title'];
   this.question.quiz['qid'] = this.qId;
  }
  formSubmit(){
    
    if(this.question.content.trim()=='' || this.question.content==null){
      return;
    }
   
    if(this.question.option1.trim()==''||this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2==null){
      return;
    }
    if(this.question.option3.trim()==''||this.question.option3==null){
      return;
    }
    if(this.question.option4.trim()==''||this.question.option4==null){
      return;
    }
    if(this.question.answer.trim()==''||this.question.answer==null){
      return;
    }
    // form submit
    this._question.addQuestion(this.question).subscribe({
      next:(data:any)=>{
        Swal.fire('Success','Question Added','success').then((e)=>{
          this._router.navigate(['/admin/view-questions/'+this.qId+'/'+ this.qTitle]);
        });
        
      },
      error:(err:any)=>{
      Swal.fire('Error','Error in load question','error');
      },
    });
  }

}
