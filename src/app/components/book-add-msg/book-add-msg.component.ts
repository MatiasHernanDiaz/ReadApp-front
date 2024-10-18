import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgIconComponent } from '@ng-icons/core'
import { Book } from '../../model/Book'

@Component({
  selector: 'app-book-add-msg',
  standalone: true,
  imports: [NgIconComponent, FormsModule],
  templateUrl: './book-add-msg.component.html',
  styleUrl: './book-add-msg.component.css'
})
export class BookAddMsgComponent {
  @Output()
  addbook: EventEmitter<Book> = new EventEmitter<Book>()
  @Output()
  close: EventEmitter<void> = new EventEmitter<void>()
  @Input()
  book!: Book
  @Input()
  title = ''

  accept() {
    this.addbook.emit(this.book)
    this.closeDialog()
  }

  closeDialog() {
    this.close.emit()
    this.title = ''
  }
  get emptyInput() {
    return this.title === ''
  }
}
