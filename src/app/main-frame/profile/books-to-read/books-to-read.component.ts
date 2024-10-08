import { Component, Input, OnInit } from '@angular/core'
import { Book } from '@src/model/Book'
import { User } from '@src/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
import { StubLoginService } from '@src/services/UserService'

@Component({
  selector: 'app-books-to-read',
  standalone: true,
  imports: [BookComponent,CommonModule],
  templateUrl: './books-to-read.component.html',
  styleUrl: './books-to-read.component.css'
})

export class BooksToReadComponent implements OnInit {
  @Input() readToBooks: Book[] = [] 
  @Input() user : User = new User(0, '', '', '', new Date(),'',[],[],[], 0 )
  
  constructor(
    private userService: StubLoginService, 
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getSignedUser()

    if (currentUser.readToBooks && currentUser.readToBooks.length > 0) {
      const allBooks = this.userService.getAllBooks()

      this.readToBooks = allBooks.filter(book => {
        return currentUser.readToBooks.some(userBook => userBook.title === book.title)
      })

    } else {
    }
  }
  
}
