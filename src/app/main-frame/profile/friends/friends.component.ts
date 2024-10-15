import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { User } from '@src/app/model/User'
import { FriendComponent } from "@src/app/components/friend/friend.component"
import { AddButtonComponent } from "@src/app/components/add-button/add-button.component"
import { UserService } from '@src/app/services/User/user.service'
import { LoginService } from '@src/app/services/Login/login.service'

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FriendComponent, AddButtonComponent],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  users: User[] = []
  friends: User[] = []
  friendsToSearch: User[] = []

  constructor(public userService: UserService, private loginService: LoginService) {}

  async ngOnInit() {
    const user = this.loginService.getSignedUser()

    await this.userService.getAllFriends(user.id).then((res) =>{
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
}
