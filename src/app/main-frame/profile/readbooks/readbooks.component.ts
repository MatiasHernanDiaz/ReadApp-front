import { Component, Input, OnInit } from '@angular/core'
import { Book } from '@src/app/model/Book'
import { User } from '@src/app/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
import { StubLoginService } from '@src/app/services/UserService'


@Component({
  selector: 'app-readbooks',
  standalone: true,
  imports: [BookComponent,CommonModule],
  templateUrl: './readbooks.component.html',
  styleUrls: ['./readbooks.component.css']
})
export class ReadbooksComponent implements OnInit {
  @Input() readBooks: Book[] = [] 
  @Input() user : User = new User(0, '', '', '', new Date(),'',[],[],[], 0 )
  
  constructor(
    private userService: StubLoginService, 
  ) {}
  ngOnInit(): void {
    const currentUser = this.userService.getSignedUser()

    if (currentUser.readBooks && currentUser.readBooks.length > 0) {
      
      const allBooks = this.userService.getAllBooks()
      
      this.readBooks = allBooks.filter(book => {
        return currentUser.readBooks.some(userBook => userBook.title === book.title)
      })
    } else {
    }
  }
  
}
