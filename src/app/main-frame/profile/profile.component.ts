import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { User } from '@src/model/User'
import { StubLoginService } from '@src/services/UserService'


@Component({
  selector: 'profile-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileScreen {
  user: User = new User( '', '', '', new Date(), '',[],[],[], 0 , )
  click: boolean = false
  dropdown: string = "hide"
  
  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
  }
}