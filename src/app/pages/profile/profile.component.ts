import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 public user:any=null;

  constructor(private login:LoginService) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    /*fetch data from server
    this.login.getCurrentUser().subscribe(
      {next:(user:any)=> {
        this.user= user;
      },
      error: (err: any)=>{
        alert('error');
      }
  });*/
  } 

}
