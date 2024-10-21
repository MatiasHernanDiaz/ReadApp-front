import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgIconComponent } from '@ng-icons/core'
import { Book } from '../../model/Book'
import { User } from '@src/app/model/User'

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
  @Output()
  removeFriend: EventEmitter<User> = new EventEmitter<User>()
  @Input()
  book!: Book
  @Input()
  title = ''
  @Input()
  friend!: User

  accept() {
    if (this.book) { 
      this.addbook.emit(this.book)
    } 
    if (this.friend) { 
      this.removeFriend.emit(this.friend)
    }
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
