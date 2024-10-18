import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Book } from '@src/app/model/Book'
import { RemoveRecomComponent } from '../remove-recom/remove-recom.component'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { bootstrapTrash } from '@ng-icons/bootstrap-icons'

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RemoveRecomComponent, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapTrash})],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})

export class BookComponent {
  @Input()
  isDeleteable: boolean = false
  @Output() onDeleteBook = new EventEmitter<number>()

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

  removeBook(id: number): void {
    this.onDeleteBook.emit(id)
  }

  @Input()
  book: Book = new Book(0,'','','',0,new Date,'',0,0)
}
