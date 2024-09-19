import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Book } from '@src/model/Book'

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})

export class BookComponent {
  enter: boolean = false
  tamanio = 180

  entrar(){
    this.enter = true
    this.tamanio = 100
  }

  salir(){
    this.enter = false
    this.tamanio = 180
  }

  @Input()
  book: Book = new Book(0)
}
