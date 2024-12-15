import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

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
      this.showError("Por favor, rellene todos los campos")
    }

    if(this.selectedOption != "" ){
      this.formData.estado = this.selectedOption
    }else{
      this.showError("Por favor seleccione su estado")
      return;
    }

    const confirmRegistration = confirm('¿Estás seguro de que deseas registrar a este usuario?');
    if (!confirmRegistration) {
      return;
    }

    this.formData.rol = "USER"
    console.log(this.formData)
    this.userService.registrar(this.formData).subscribe(
      data => {
        if(data.statuscode == 200)
          this.router.navigate(['login']).then(() => {
            window.location.reload();
            });
      })
  }

  crearAdmin(){
    if(!this.formData.nombre || !this.formData.street || !this.formData.email || !this.formData.imgUrl ||
      !this.formData.fecha || !this.formData.password){
      this.showError("Por favor, rellene todos los campos")
    }

    if(this.selectedOption != "" ){
      this.formData.estado = this.selectedOption
    }else{
      this.showError("Por favor seleccione su estado")
      return;
    }

    if(this.selectedOption1 != "" ){
      this.formData.rol = this.selectedOption1
    }else{
      this.showError("Por favor seleccione su estado")
      return;
    }
    const token:any = localStorage.getItem('token')
    this.userService.crearUserAdmin(this.formData, token).subscribe(
      data => {
        if(data.statuscode == 200)
          this.router.navigate(['perfil/userlist']).then(() => {
            window.location.reload();
            });
      })

  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
