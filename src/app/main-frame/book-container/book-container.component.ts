import { Component, EventEmitter, Output } from '@angular/core'
import { BookComponent } from '@src/app/components/book/book.component'
import { Book } from '@src/app/model/Book'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import { BookService } from '@src/app/services/Book/book.service'
import { CommonModule } from '@angular/common'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'
import { ReadbooksComponent } from '../profile/readbooks/readbooks.component'


@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent, SearchBarComponent, CommonModule, SpinnerComponent, ReadbooksComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {
  @Output()
  bookRead: EventEmitter<Book> = new EventEmitter<Book>()

  books: Array<Book> = []
  loading: boolean = true



  async ngOnInit() {

    this.goToFind('')
  }
  constructor(private BookService: BookService) {
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
    this.bookRead.emit(book)
  }


}
