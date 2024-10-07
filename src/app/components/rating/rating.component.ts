import { Component, Input } from '@angular/core'
import { User } from '@src/model/User'
import { CommonModule } from '@angular/common'
import { StubLoginService } from '@src/services/UserService'
import { Rating } from '@src/model/rating'


@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  dateOfCreation = new Date
  @Input() rating: Rating = new Rating(new User( '', '', '', new Date(), '',[],[],[], 0 , ), 4, '')

  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    console.log('en el detalle ', this.rating)
  }


}
