import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  enter: boolean = false
  tamanio = 200

  entrar(){
    this.enter = true;
    this.tamanio = 100;
  }

  salir(){
    this.enter = false;
    this.tamanio = 200;
  }


  
}
