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
import { ActivatedRoute, Router } from '@angular/router'
import { BookAddMsgComponent } from 'src/app/components/book-add-msg/book-add-msg.component'


@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookAddMsgComponent, BookComponent, SearchBarComponent, CommonModule, SpinnerComponent, ReadbooksComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {
  isToRead?: boolean
  books: Array<Book> = []
  loading: boolean = true
  dialogOpen: boolean = false
  bookSelected: Book = new Book(0,'','','',0,new Date(0,0,0),'',0,0)
  title: string= ""



  async ngOnInit() {

    this.goToFind('')
  }
  constructor(private BookService: BookService, private UserService: UserService, private loginService: LoginService, private router: ActivatedRoute, private route: Router) {
    this.BookService.items.subscribe((allBooks) => {
      this.books = allBooks
      this.isLoading()
    })
    this.router.data.subscribe((data) => { this.isToRead = data['isToRead'] })
  }


  async goToFind(text: string) {
    if (this.isToRead) {
      this.BookService.items = await this.BookService.getToReadBooks(this.loginService.getSignedUser().id, text)
    }
    else {
      this.BookService.items = await this.BookService.getReadBooks(this.loginService.getSignedUser().id, text)
    }
  }


  isLoading() {
    if (this.books.length > 0) {
      this.loading = false
    }
  }

  selected(book: Book) {
    if (this.isToRead) {
      this.bookSelected = book
      this.title = "¿seguro que quiere agregar este libro a libros a leer?"
      this.dialogOpen = true

    }
    else if (!this.isToRead) {
      this.bookSelected = book
      this.title = "¿seguro que quiere agregar este libro a libros leidos?"
      this.dialogOpen = true
    }
  }

  loadBook(newBook: Book) {
    if (this.isToRead) {
      this.UserService.loadToRead(this.loginService.getSignedUser(), newBook)
      this.route.navigate(['app/profile/bookstoread'])
    }
    else if (!this.isToRead) {
      this.UserService.loadReadBook(this.loginService.getSignedUser(), newBook)
      this.route.navigate(['app/profile/readbooks'])
    }
  }

  closeDialog(): void {
    this.dialogOpen = false
  }

}
