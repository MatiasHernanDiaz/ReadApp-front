import { Component, Input } from '@angular/core'

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
    this.enter = true
    this.tamanio = 100
  }

  salir(){
    this.enter = false
    this.tamanio = 200
  }

  @Input()
  title: string = ""
  @Input()
  imageURL: string = ""
  @Input() 
  autor: string = ""
  @Input() 
  pages: number = 0
  @Input() 
  words: number = 0
  @Input() 
  date1: Date = new Date(0,0,0)
  @Input() 
  lenguages: string = "english"
  @Input() 
  sales: number = 0
}
