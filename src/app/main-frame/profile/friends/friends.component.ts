import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { User } from '@src/app/model/User'
import { FriendComponent } from "@src/app/components/friend/friend.component"
import { AddButtonComponent } from "@src/app/components/add-button/add-button.component"
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'
import { BookAddMsgComponent } from '../../../components/book-add-msg/book-add-msg.component'

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FriendComponent, AddButtonComponent,BookAddMsgComponent],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: User[] = []
  friends: User[] = []
  friendsToSearch: User[] = []

  friendSelected!: User
  title: string = ""
  dialogOpen: boolean = false
  constructor(public userService: UserService, private loginService: LoginService) {}

  ngOnInit() {
   this.getFriends()

  }
  
  getFriends(){
    const user = this.loginService.getSignedUser()

    this.userService.getAllFriends(user.id).then((res) =>{
      this.friends = res
    })
  }

  async findFriends( searchWord: string ) {
    this.friendsToSearch = await this.userService.searchFriends( this.loginService.getSignedUser(), searchWord )
  }

  async loadNewFriend( newFriend: User ) {
    const newFriendList = await this.userService.loadFriend( this.loginService.getSignedUser(), newFriend )
    this.friends = newFriendList.map( fri => User.fromUserJSON(fri) )
  }

  toDelete(friend: User) {
    this.friendSelected = friend
    this.title = "¿seguro que quiere eliminar este amigo?"
    this.dialogOpen = true
  }

  async deleteFriend(friend: User) {
    const userId = this.loginService.getSignedUser()!.id
    console.log(`Eliminando amigo con ID: ${friend.id} para el usuario ID: ${userId}`) // Agrega este log

    await this.userService.deleteFriend(userId, friend.id)

    // Recargar la lista de amigos después de eliminar uno
    this.getFriends()
}
}
