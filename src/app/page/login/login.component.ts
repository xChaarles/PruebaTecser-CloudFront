import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2'
import { timeout } from 'rxjs';

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
  mensaje: string;

  constructor(private userService:UserService,
              private router:Router
              ){}

  ngOnInit(): void {
    
  }

  login(){
    this.userService.login(this.email, this.password).subscribe(
      data => {
        if(data.statuscode == 200){
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.eemail)
          localStorage.setItem('nombre', data.nombre)
          localStorage.setItem('rol', data.rol)
          localStorage.setItem('img', data.imgUrl)
          this.alert()
          setTimeout(() => {
            this.router.navigate(['perfil/userlist']).then(() => {
              window.location.reload();
              });
          }, 3000);
        }else{
          this.error();
        }
      }
    )
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Contraseña o Usuario no validos.",
      showConfirmButton: false,
      timer: 1500
    });
  }

  alert(){
    const nombre = localStorage.getItem('nombre')
    Swal.fire({
      icon: 'success',
      title: 'Incio de Sesion',
      text: `Bienvenido de vuelta ${nombre}`,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
