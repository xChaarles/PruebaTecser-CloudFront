import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export default class UpdateUserComponent implements OnInit {

  mensaje: string;

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  userData: any = {};
  
  roles:any = {};
  id:any;
  selectedOption: string;
  selectedOption1: string;

  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();

    this.getUserById();
  }

  getUserById(){
    this.id = this.route.snapshot.paramMap.get('id');
    const token:any = localStorage.getItem('token');
    this.userService.getUserById(this.id, token).subscribe(
      data => {
        let userData = data;
        const {nombre, street, imgUrl, email, fecha, estado, rol} = userData.user;
        this.userData = {nombre, street, imgUrl, email, fecha, estado, rol};
        console.log(this.userData)
      }
    )
  }

  updateUser(){
    this.id = this.route.snapshot.paramMap.get('id');
    const token:any = localStorage.getItem('token');

    if(!this.userData.nombre || !this.userData.street || !this.userData.email || !this.userData.imgUrl ||
      !this.userData.fecha || !this.userData.estado || !this.userData.rol ){
      this.showError("Por favor, rellene todos los campos")
    }

    this.userService.updateUser(this.id, this.userData,  token).subscribe(
      data=> {
        if (data.statuscode = 200) { 
          this.router.navigate(['/perfil/userlist']) }
      }
    )

  }

  showError(message: string) {
    this.mensaje = message;
    setTimeout(() => {
      this.mensaje = ''; // Borrar el mensaje de error después del tiempo especificado
    }, 3000);
  }

}
