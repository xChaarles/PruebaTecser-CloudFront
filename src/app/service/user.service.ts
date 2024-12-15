import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<any>{
    const url = `${this.api}/auth/login`
    return this.http.post<any>(url, {email, password})
  }

   //Metodoos de autenticacion
   logOut(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.removeItem('token')
      localStorage.removeItem('rol')
    }
  }

  isAuthenticated(): boolean{
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  isAdmin(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('rol');
      return role == "ADMIN";
    }
    return false;
  }

  isUser(): boolean{
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('rol');
      return role == "USER";
    }
    return false;
  }
}
