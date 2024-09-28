import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StubLoginService } from '@src/model/User'
import { User } from '@src/model/User'
import { FriendComponent } from "../../../components/friend/friend.component"

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FriendComponent],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: User[] = []
  friend: User[] = []

  constructor(private userService: StubLoginService) {}

  ngOnInit(): void {
    const currentUser = this.userService.getSignedUser()
    console.log("Current User:", currentUser)     
      if (currentUser.friends) {
        // Crear un conjunto de usernames de amigos para búsqueda rápida
        const friendUsernames = new Set(currentUser.friends.map(friend => friend.username))
        
        // Filtrar usuarios para encontrar amigos
        this.friend = this.userService.getUsers().filter(user => {
          const isFriend = friendUsernames.has(user.username)
          return isFriend 
        })
      }
  }
}
