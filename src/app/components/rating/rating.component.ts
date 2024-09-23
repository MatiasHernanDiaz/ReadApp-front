import { Component, Input } from '@angular/core'
import { User } from '@src/model/User'
import { StubLoginService } from '@src/model/User'
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {

  //----->
  //Primera aproximacion con el servicio de usuario
  user: User = new User( '', '', '', new Date(), '',[], 0 , )
  textOfrating: string = 'Que buen libro, es uno de los mejores que he leido hasta Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio beatae porro molestiae harum, nesciunt minus ullam soluta veniam, temporibus vel error ad expedita architecto cupiditate numquam iusto dolore iste cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel commodi, alias eaque harum odio minus distinctio. Inventore soluta blanditiis neque commodi odio ipsa libero aliquam eligendi eius aut, saepe optio?'
  dateOfCreation = new Date
  @Input() rating: { user: User; nRating: number; text: string; } = {user: this.user, nRating: 4, text: this.textOfrating} //inicializado asi para mostrar algo por ahora

  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
    console.log(this.user)
  }

  //<------


}
