import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { User } from '@src/app/model/User'
import { FriendComponent } from "@src/app/components/friend/friend.component"
import { AddButtonComponent } from "@src/app/components/add-button/add-button.component"
import { StubLoginService, UserService } from '@src/app/services/User/user.service'
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

  constructor(public userService: UserService, private loginService: LoginService, public temporalService: StubLoginService) {}

  async ngOnInit() {
    const user = this.loginService.getSignedUser()!

    await this.userService.getAllFriends(user.id).then((res) =>{
      this.friends = res
    })

  }
}
