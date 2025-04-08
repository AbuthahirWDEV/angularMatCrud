import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.modal';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string ="http://localhost:3000/enquiry"

  constructor(private http: HttpClient) { }

  postRegistration(registerObj: User){
    return this.http.post<User>(this.baseUrl, registerObj);
  }

  getRegisterdUser(){
    return this.http.get<User[]>(this.baseUrl);
  }

  updateRegisterUser(registerObj: User, id:string){
    return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj);
  }

  deleteRegistered(id:string){
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }

  getRegisteredUserId(id:string){
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

}
