import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Book } from '@src/app/model/Book'

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})

export class BookComponent {
  isEnter: boolean = false
  width = 180
  height = 270

  enter(){
    this.isEnter = true
    this.width = 100
    this.height = 140
  }

  exit(){
    this.isEnter = false
    this.width = 180
    this.height = 270
  }

  @Input()
  book: Book = new Book(0,'','','',0,new Date,'',0,0)
}
