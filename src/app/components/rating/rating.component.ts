import { Component, Input } from '@angular/core'
import { Language, User } from '@src/app/model/User'
import { CommonModule } from '@angular/common'
import { UserService } from '@src/app/services/User/user.service'
import { Rating } from '@src/app/model/rating'


@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  dateOfCreation = new Date
  
  @Input() rating : Rating = new Rating(new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 ),1,'')
  user: User = new User(0, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )

  constructor( public userService: UserService ) {}

  async ngOnInit() {
    await this.userService.getUser(this.rating.creator.id).then((res)=>{
      this.user = res
      console.log('tengo usuario en rating -> ', this.user)
    })
  }


}
