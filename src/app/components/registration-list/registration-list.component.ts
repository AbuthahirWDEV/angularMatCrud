import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user.modal';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit{
  public dataSource!:MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   displayedColumns: string[] = ['id','firstName','lastName','email','mobile','bmiResults','gender','height','weight','bmi','enquiryDate','action']

   constructor(private api:ApiService , private router: Router){
    
   }
  ngOnInit(): void {
    this.getUsers()
  }

   getUsers(){
    this.api.getRegisterdUser().subscribe(res =>{
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }

   edit (id: number){
    this.router.navigate(['update',id])
  }

}
