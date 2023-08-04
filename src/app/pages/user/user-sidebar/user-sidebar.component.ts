import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  categories:any;
  constructor(private _cat:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this._cat.categories().subscribe({
     
      next:(data:any)=>{
       
        this.categories=data;
      },
     error: (err:any)=>{
        this._snack.open('Error in loading category','',{
          duration:3000,
        });
      }
    });
  }

}
