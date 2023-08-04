import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  category={
    title:'',
    description:''
  };
  constructor(private _category:CategoryService , private snack: MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.category.title.trim() == '' || this.category.title== null)
    {
      this.snack.open('Title Required !!', '',{
        duration: 3000,
      });
      return;
    }
    this._category.addCategory(this.category).subscribe(
      {
        next:(data:any)=>{
          this.category.title = '';
          this.category.description='';
          Swal.fire('Success!!' ,'Category Added Successfully','success');
        },
        error: (err: any)=>{
          console.log(err);
          Swal.fire('Error !!' ,'Error in loading data','error');
        }
      }
    );
  }

}
