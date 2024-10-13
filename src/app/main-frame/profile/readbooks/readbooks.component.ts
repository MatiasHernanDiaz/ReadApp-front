import { Component, Input, OnInit } from '@angular/core'
import { Book } from '@src/app/model/Book'
import { Language, User } from '@src/app/model/User'  
import { BookComponent } from '@src/app/components/book/book.component'
import { CommonModule } from '@angular/common'
//import { StubLoginService } from '@src/app/services/UserService'
import { UserService } from '@src/app/services/User/user.service'


@Component({
  selector: 'app-readbooks',
  standalone: true,
  imports: [BookComponent,CommonModule],
  templateUrl: './readbooks.component.html',
  styleUrls: ['./readbooks.component.css']
})
export class ReadbooksComponent implements OnInit {
  @Input() readBooks: Book[] = [] 
  @Input() user : User = new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
  
  constructor(
    private userService: UserService, 
  ) {}
  async ngOnInit() {
    //hardcodeado el userid porque no tengo el metodo y bla bla bla lo que dije en friends
    this.userService.getBookToRead(7,false).then((res)=>{
      this.readBooks = res
      console.log(res)
    })
  }
  
}
