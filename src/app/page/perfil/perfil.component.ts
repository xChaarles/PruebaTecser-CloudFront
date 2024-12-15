import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export default class PerfilComponent implements OnInit {

  rol:any

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol')
  }

}
