import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { User } from '@src/app/model/User'
import { FriendComponent } from "@src/app/components/friend/friend.component"
import { AddButtonComponent } from "@src/app/components/add-button/add-button.component"
import { StubLoginService, UserService } from '@src/app/services/User/user.service'

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

  constructor(public userService: UserService, public userService1 : StubLoginService) {}

  async ngOnInit() {
    //TODO: ACA HARDCODE EL USUARIO PORQUE NO TENGO UN METODO QUE ME DIGA QUIEN CARAJO ESTA LOGEADO
    //SERIA DEL SERVICE DE LOGIN
    //OJOTA, NO MANEJAMOS NINGUN ERROR
    await this.userService.getAllFriends(4).then((res) =>{
      this.friends = res
    })

  }
}
