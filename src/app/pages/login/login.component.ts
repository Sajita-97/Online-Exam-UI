import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

//import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public loginData={
    username:'',
    password:''
  }
  constructor(private snack:MatSnackBar,private service:LoginService,private router:Router) { }
  

  ngOnInit(): void {
  }
   formSubmit(){
    console.log('login button clicked');
    if(this.loginData.username.trim() == '' ||
    this.loginData.username == null)
    {
      this.snack.open('Username is Required','',{
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim() == '' ||
       this.loginData.password == null)
    {
      this.snack.open('Password is Required','',{
        duration:3000,
      });
      return;
    }
    this.service.generateToken(this.loginData).subscribe(
      {
        
       next:(data:any)=>{
        
        console.log('success');
          console.log(data);
        

           this.service.loginUser(data.token);
           this.service.getCurrentUser().subscribe({
            next:(user:any)=>{
              this.service.setUser(user);
              console.log(user);

              // redirect to admin
              //redirect to user
              if(this.service.getUserRole() == 'ADMIN'){
                // redirect to admin dashboard
               // window.location.href ='/admin';
               this.router.navigate(['admin']);
               this.service.loginStatusSubject.next(true);// it says nav component user is loggedIn and those user are used it asObservabe ,then it emit a value
              
              }
              else if(this.service.getUserRole() == 'NORMAL'){
                // redirect to user-dashboard
             // window.location.href ='/user-dashboard';
                this.router.navigate(['/user-dashboard/0']);
                this.service.loginStatusSubject.next(true); 
              }
               else{
                this.service.logout();
               }
              }

          });
          
         
        },
        error: (err: any)=>{
          console.log('Error!');
           console.log(err);
           this.snack.open('Invalid Details ! Try Again' ,'',{
           duration:3000},);
           
          }
        });
        
        }
      }
       
    
   

