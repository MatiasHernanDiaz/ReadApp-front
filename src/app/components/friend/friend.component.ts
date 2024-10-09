import { Component, Input } from '@angular/core'
import { User } from '@src/app/model/User'

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})

export class FriendComponent {
  @Input() user : User = new User(0, '', '', '', new Date(),'',[],[],[], 0 )
}
