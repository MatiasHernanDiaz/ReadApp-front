import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { Language, User } from '@src/app/model/User'
import { LoginService } from '@src/app/services/Login/login.service'


@Component({
  selector: 'profile-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileScreen {
  user: User = new User(0, '', '', '', new Date(), '',Language.SPANISH,[],[],[], 0 , )
  click: boolean = false
  dropdown: string = "hide"
  
  constructor( public loginService: LoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
  }
}