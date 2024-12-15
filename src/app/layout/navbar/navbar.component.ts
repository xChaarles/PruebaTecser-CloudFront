import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  img: any;
  nombre:any;
  rol:any;

  constructor(private userService:UserService,
              private router:Router){}
  
  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
    
    this.img = localStorage.getItem('img')
    this.nombre = localStorage.getItem('nombre')
    this.rol = localStorage.getItem('rol')
  }

  CerrarSesion(): void{
    this.userService.logOut();
    localStorage.removeItem('img_url');
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['login']).then (() => {
      window.location.reload();
    });
  }
}
