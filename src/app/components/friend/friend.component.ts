import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Language, User } from '@src/app/model/User'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { bootstrapTrash } from '@ng-icons/bootstrap-icons'


@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ bootstrapTrash})],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})

export class FriendComponent {
  @Input() user : User = new User(0, '', '', '', new Date(),'',Language.SPANISH,[],[],[], 0 )
  
  // eliminar friends
  @Output() onDeleteFriend = new EventEmitter<User>()

  removeFriend(): void {
    this.onDeleteFriend.emit(this.user) // Emitir el usuario que se quiere eliminar
  }
}
