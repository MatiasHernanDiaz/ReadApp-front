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
  size = 180

  enter(){
    this.isEnter = true
    this.size = 100
  }

  exit(){
    this.isEnter = false
    this.size = 180
  }

  @Input()
  book: Book = new Book(0,'','','',0,new Date,'',0,0)
}
