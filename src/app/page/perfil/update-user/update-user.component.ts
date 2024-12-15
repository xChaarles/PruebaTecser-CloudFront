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
  
  roles:any = {};
  id:any;
  user: any = {};
  selectedOption: string = this.user.estado;
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
        console.log(data)
        this.user = data.user
        this.roles = data.user.rol
        console.log(this.roles)
      }
    )

  }

}
