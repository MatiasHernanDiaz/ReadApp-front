import { Component, Input, OnInit } from '@angular/core'
import { Book } from '@src/app/model/Book'
import { Language, User } from '@src/app/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'

@Component({
  selector: 'app-books-to-read',
  standalone: true,
  imports: [BookComponent,CommonModule],
  templateUrl: './books-to-read.component.html',
  styleUrl: './books-to-read.component.css'
})

export class BooksToReadComponent implements OnInit {
  @Input() readToBooks: Book[] = [] 
  @Input() user : User = new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
  
  constructor(
    private userService: UserService, private loginService: LoginService 
  ) {}

  async ngOnInit() {
    const user = this.loginService.getSignedUser()!
    this.userService.getBookToRead(user.id, true).then((res)=>{
      this.readToBooks = res
    })
  }
}
