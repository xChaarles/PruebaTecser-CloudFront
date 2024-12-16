import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  registrar(formData:any):Observable<any>{
    const url = `${this.api}/auth/registrar`
    return this.http.post<any>(url, formData)
  }

  getAllUser( token: string):Observable<any>{
    const url = `${this.api}/adminuser/getallUser`
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.get<any>(url, {headers})
  }

  crearUserAdmin(formData:any, token:string):Observable<any>{
    const url = `${this.api}/admin/registrar`
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.post<any>(url, formData, {headers})
  }

  getUserById(id:string, token:string):Observable<any>{
    const url = `${this.api}/adminuser/getUser/${id}`
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.get<any>(url, {headers})
  }

  updateUser(id:string, formData:any, token:string):Observable<any>{
    const url = `${this.api}/admin/updateUser/${id}`
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.put<any>(url, formData, {headers})
  }

  deleteUser(id:string, token:string):Observable<any>{
    const url = `${this.api}/admin/deleteUser/${id}`
    const headers = new HttpHeaders ({
      'Authorization' :`Bearer ${token}`
    });
    return this.http.delete<any>(url, {headers})
  }

  BusquedaUser(nombre:string):Observable<any>{
    const url = `${this.api}/public/busqueda?nombre=${nombre}`
    return this.http.get<any>(url)
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
