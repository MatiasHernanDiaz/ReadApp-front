import { Component, Input, OnInit } from '@angular/core'
import { Book } from '@src/app/model/Book'
import { Language, User } from '@src/app/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'
import { AddBookComponent } from '../../../components/add-book/add-book.component'
import { BookAddMsgComponent } from '../../../components/book-add-msg/book-add-msg.component'

@Component({
  selector: 'app-books-to-read',
  standalone: true,
  imports: [BookComponent, CommonModule, AddBookComponent, BookAddMsgComponent],
  templateUrl: './books-to-read.component.html',
  styleUrl: './books-to-read.component.css'
})

export class BooksToReadComponent implements OnInit {
  @Input() readToBooks: Book[] = [] 
  @Input() user: User = new User(0, '', '', '', new Date(), '', Language.SPANISH, [], [], [], 0)

  bookSelected!: Book
  title: string = ""
  dialogOpen: boolean = false
  
  constructor(
    private userService: UserService, private loginService: LoginService 
  ) {}

  async ngOnInit() {
    this.getBooks()
  }

  toDelete(book: Book) {
    this.bookSelected = book
    this.title = "¿seguro que quiere eliminar este libro a libros a leer?"
    this.dialogOpen = true
  }

  async onConfirmDelete(book: Book) {
    const userId = this.loginService.getSignedUser()!.id
    await this.userService.deleteToRead(userId, book.id)
    this.dialogOpen = false
    this.getBooks()
  }

  getBooks() {
    const user = this.loginService.getSignedUser()!

    this.userService.getBookToRead(user.id, true).then((res) => {
      this.readToBooks = res
    })
  }

  closeDialog(): void {
    this.dialogOpen = false
  }
}
