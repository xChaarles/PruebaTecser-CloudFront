import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;
  correo = "info@tecsersas.com"

  constructor(private userService:UserService,
              private router:Router){}
  
  ngOnInit(): void {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  CerrarSesion(): void{
    this.userService.logOut();
    localStorage.removeItem('img_url');
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['pages/inicio']).then (() => {
      window.location.reload();
    });
  }
}
