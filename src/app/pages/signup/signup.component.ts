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
  selectedFile: File | null = null;
  profile: string | ArrayBuffer | null = null;

  constructor(private service:StudentService,private snack:MatSnackBar) { }
  public student = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    address:'',
  
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
  onFileSelected(event:any):void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {

      // Here, you can implement the code to upload the image to your server.
      // You can use HttpClient to send a POST request to your server's image upload endpoint.
      // Make sure to handle the server response accordingly.
      // Example:
      // this.httpClient.post('your-upload-endpoint', formData).subscribe(response => {
      //   // Handle the response here
      // });
    }
  }
}

