import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Book } from '@src/app/model/Book'
import { Language, User } from '@src/app/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'
import { AddBookComponent } from '../../../components/add-book/add-book.component'


@Component({
  selector: 'app-readbooks',
  standalone: true,
  imports: [BookComponent, CommonModule, AddBookComponent],
  templateUrl: './readbooks.component.html',
  styleUrls: ['./readbooks.component.css']
})
export class ReadbooksComponent implements OnInit {
  @Input() readBooks: Book[] = [] 
  @Input() user: User = new User(0, '', '', '', new Date(), '', Language.SPANISH, [], [], [], 0)

  
  constructor(
    private userService: UserService, private loginService: LoginService
  ) {}
  async ngOnInit() {
    const user = this.loginService.getSignedUser()!

    this.userService.getBookToRead(user.id, false).then((res)=>{
      this.readBooks = res
    })
  }

  @Output()
  newBook(book: Book) {
    console.log(book)
  }


}
