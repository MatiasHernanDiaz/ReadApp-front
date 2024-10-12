import { Component, Input } from '@angular/core'
import { Language, User } from '@src/app/model/User'
import { CommonModule } from '@angular/common'
import { StubLoginService } from '@src/app/services/UserService'
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
  @Input() rating: Rating = new Rating(new User(0, '', '', '', new Date(), '',Language.SPANISH,[],[],[], 0 , ), 4, '')

  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    console.log('en el detalle ', this.rating)
  }


}
