import { Component, Input } from '@angular/core'
import { BookComponent } from '@src/app/components/book/book.component'
import { Book } from '@src/app/model/Book'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import { BookService } from '@src/app/services/Book/book.service'
import { CommonModule } from '@angular/common'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'


@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent, SearchBarComponent, CommonModule, SpinnerComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {

  books: Array<Book> = []
    

  async ngOnInit() {
    this.BookService.items = await this.BookService.getAllBooks()

    //this.goToFind('')
  }
  constructor(private BookService: BookService) {
    this.BookService.items.subscribe((allBooks) => {
      this.books = allBooks
    })
    //console.log(this.books)
  }


  async goToFind(text: string) {
    this.BookService.items = await this.BookService.getAllBooks(text)
  }
  @Input() test = false

}
