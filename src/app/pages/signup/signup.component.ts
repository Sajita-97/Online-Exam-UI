import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../service/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  

  constructor(private service:StudentService,private snack:MatSnackBar) { }
  public student = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    address:''
  }
   
 

  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.student);
    /*if(this.student.username=='' || this.student.username== null){
      this.snack.open('Username is required!','',{
        duration:3000
      });
       return;
    } */
    
    this.service.addStudent(this.student).subscribe(
    {
      next:(data)=>{
        console.log(data);
        Swal.fire('Success','User is Successfully Register','success');
      },
      error: (err: any)=>{
         console.log(err);
         this.snack.open('something is wrong!','',{
          duration:3000
        });
      }
    }
      );
    

  }

}
