import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.modal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  public userId!: any;
  userDetail!: User;
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.userId = val['id'];
      this.fetchUserDetail(this.userId)
    })
  }

  fetchUserDetail(userId:any){
    this.api.getRegisteredUserId(userId)
    .subscribe(res =>{
      this.userDetail = res;
    })
  }
}
