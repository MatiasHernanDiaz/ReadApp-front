import { Component, Input } from '@angular/core'
import { Language, User } from '@src/app/model/User'
import { CommonModule } from '@angular/common'
import { UserService } from '@src/app/services/User/user.service'
import { RatingWithId } from '@src/app/model/rating'


@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  dateOfCreation = new Date
  
  @Input() rating: RatingWithId = {creatorId:-1,description:'',rating:0, creatorFullName:'',createDate:new Date,avatar:''}

  user: User = new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )

  constructor( public userService: UserService ) {
    
  }

}
