import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export default class RegistrarComponent implements OnInit {
  
  mensaje: string;
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  formData: any = {
    nombre: '',
    street: '',
    email: '',
    imgUrl: '',
    fecha: '',
    estado:'',
    password: '',
    rol: ''
  };

  selectedOption: string = '';
  selectedOption1: string = '';
  errorMessage:string

  constructor( private userService:UserService,
               private router:Router
  ){}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();  
  }

  registrar(){
    if(!this.formData.nombre || !this.formData.street || !this.formData.email || !this.formData.imgUrl ||
      !this.formData.fecha || !this.formData.password){
        this.info()
    }

    if(this.selectedOption != "" ){
      this.formData.estado = this.selectedOption
    }else{
      this.info()
      return;
    }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este usuario?');
    if (!confirmRegistration) {
      return;
    }

    this.formData.rol = "USER"
    this.userService.registrar(this.formData).subscribe(
      data => {
        if(data.statuscode == 200){
          this.alert();
          setTimeout(() => {
            this.router.navigate(['login']).then(() => {
              window.location.reload();
              });
          }, 3000);
        }else {
          this.error();
        }
      })
  }

  crearAdmin(){
    if(!this.formData.nombre || !this.formData.street || !this.formData.email || !this.formData.imgUrl ||
      !this.formData.fecha || !this.formData.password){
      this.info()
    }

    if(this.selectedOption != "" ){
      this.formData.estado = this.selectedOption
    }else{
      this.info()
      return;
    }

    if(this.selectedOption1 != "" ){
      this.formData.rol = this.selectedOption1
    }else{
      this.info()
      return;
    }
    const token:any = localStorage.getItem('token')
    this.userService.crearUserAdmin(this.formData, token).subscribe(
      data => {
        if(data.statuscode == 200){
          this.alert();
          setTimeout(() => {
            this.router.navigate(['perfil/userlist']).then(() => {
              window.location.reload();
              });
          }, 3000);
        }else {
          this.error();
        }
      })
  }

  info(){
    Swal.fire({
      icon: "info",
      title: "Porfavor llena todos los campos.",
      showConfirmButton: false,
      timer: 1500
    });
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text:"Ocurrio un error al hacer el registro",
      showConfirmButton: false,
      timer: 1500
    });
  }
  
  alert(){
    Swal.fire({
      icon: 'success',
      title: 'Registro Exitoso',
      text: `El usuario ${this.formData.nombre} se ah registrado exitosamente`,
      showConfirmButton: false,
      timer: 2000
    });
  }
}
