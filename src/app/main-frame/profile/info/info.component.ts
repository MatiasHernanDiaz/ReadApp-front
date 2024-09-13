import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { StubLoginService, User } from '../../../../model/User'
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  user: User = new User( '', '', '', new Date(), '', 0 )

  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
  }

  saveUserInfo() {
    this.loginService.updateSignedUserData( this.user )
  }
}

