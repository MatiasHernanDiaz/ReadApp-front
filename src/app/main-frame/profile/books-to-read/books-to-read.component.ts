import { Component, Input, OnInit } from '@angular/core'
import { Book } from '@src/app/model/Book'
import { Language, User } from '@src/app/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
import { UserService } from '@src/app/services/User/user.service'

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
    private userService: UserService, 
  ) {}
  async ngOnInit() {
    //hardcodeado el userid porque no tengo el metodo y bla bla bla lo que dije en friends
    this.userService.getBookToRead(7,true).then((res)=>{
      this.readToBooks = res
      console.log(res)
    })
  }
}
