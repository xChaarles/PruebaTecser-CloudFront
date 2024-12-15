import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule ,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit{

  email: string;
  password: string;

  constructor(private userService:UserService,
              private router:Router
              ){}

  ngOnInit(): void {
    
  }

  login(){
    this.userService.login(this.email, this.password).subscribe(
      data => {
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.eemail)
        localStorage.setItem('rol', data.rol)
        localStorage.setItem('img', data.imgUrl)
        this.router.navigate(['login']).then(() => {
          window.location.reload();
          });
      },
      error => {

      }
    )
  }

}
