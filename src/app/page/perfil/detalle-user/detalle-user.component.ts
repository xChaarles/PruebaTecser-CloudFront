import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-user',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './detalle-user.component.html',
  styleUrl: './detalle-user.component.css'
})
export default class DetalleUserComponent {
  
  mensaje: string;
  
  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;
  userData: any = {};
  role:any = {}
  id:any;

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
        this.role = data.user.rol
        let userData = data;
        const {nombre, street, imgUrl, email, fecha, estado, rol} = userData.user;
        this.userData = {nombre, street, imgUrl, email, fecha, estado, rol};
        console.log(this.userData)
      }
    )
  }
}
