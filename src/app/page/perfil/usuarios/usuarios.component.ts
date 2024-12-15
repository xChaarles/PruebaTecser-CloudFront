import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export default class UsuariosComponent implements OnInit {

  user: any = []
  paginaActual:number = 1;
  pageSize:number = 5;
  paginaXUsers:any[] = [];
  totalUsers:number;
  totalPaginas:number;

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;

  constructor(private userService:UserService,
              private router:Router
  ){}
  
  ngOnInit(): void {
    this.getUseer()
    this.isAuthenticated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
    this.isUser = this.userService.isUser();
  }

  getUseer(){
    const token: any = localStorage.getItem('token')
    this.userService.getAllUser(token).subscribe(
      data => {
        console.log(data)
        this.user = data.userList
        this.totalUsers = this.user.length;
        this.totalPaginas = Math.ceil(this.totalUsers / this.pageSize);
        this.updatePaginatedUsers()
      }
    )
  }

  updatePaginatedUsers() {
    const startIndex = (this.paginaActual - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginaXUsers = this.user.slice(startIndex, endIndex);
  }

  // Cambia a la página siguiente
  nextPage() {
    if (this.paginaActual * this.pageSize < this.user.length) {
      this.paginaActual++;
      this.updatePaginatedUsers();
    }
  }

  // Cambia a la página anterior
  previousPage() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.updatePaginatedUsers();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPaginas) {
      this.paginaActual = page;
      this.updatePaginatedUsers();
    }
  }

}
