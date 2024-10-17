import { Component } from '@angular/core'
import { BookComponent } from '@src/app/components/book/book.component'
import { Book } from '@src/app/model/Book'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import { BookService } from '@src/app/services/Book/book.service'
import { CommonModule } from '@angular/common'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'
import { ReadbooksComponent } from '../profile/readbooks/readbooks.component'
import { UserService } from '../../services/User/user.service'
import { LoginService } from '../../services/Login/login.service'


@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent, SearchBarComponent, CommonModule, SpinnerComponent, ReadbooksComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {
  isToRead?: Boolean
  books: Array<Book> = []
  loading: boolean = true



  async ngOnInit() {

    this.goToFind('')
  }
  constructor(private BookService: BookService, private UserService: UserService, private loginService: LoginService) {
    this.BookService.items.subscribe((allBooks) => {
      this.books = allBooks
      this.isLoading()
    })
  }


  async goToFind(text: string) {
    this.BookService.items = await this.BookService.getAllBooks(text)
  }


  isLoading() {
    if (this.books.length > 0) {
      this.loading = false
    }
  }

  selected(book: Book) {
    if (this.isToRead) {
      this.loadToRead(book)
    }
    else if (!this.isToRead) {
      this.loadReadBook
    }
  }

  async loadToRead(newBook: Book) {
    const newBookList = await this.UserService.loadToRead(this.loginService.getSignedUser(), newBook)
    console.log(newBook.title + " fue agregado a ToRead")
  }
  async loadReadBook(newBook: Book) {
    const newBookList = await this.UserService.loadReadBook(this.loginService.getSignedUser(), newBook)
    console.log(newBook.title + " fue agregado a ReadBook")
  }


}
