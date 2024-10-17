import { Component } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { Language, User } from '@src/app/model/User'
import { LoginService } from '@src/app/services/Login/login.service'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user: User = new User(-1, '', '', '', new Date(), '',Language.SPANISH,[],[],[], 0)
  private userObserver: Subscription = new Subscription()
  click: boolean = false
  dropdown: string = "hide"
  
  constructor( public loginService: LoginService, private router: Router ) {}

  async ngOnInit() {
    this.user = this.loginService.getSignedUser()!

    this.userObserver = this.loginService.changeSignedUserSubject.asObservable().subscribe(
      newUser => { this.user = newUser }
    )

    if( !this.user || this.user.id < 0 ) {
      this.user = User.fromUserJSON((await this.loginService.refreshSignedUser()).user)
    }
  }


  ngOnDestroy() {
    this.userObserver.unsubscribe()
  }


  handleClickMenu(){
    this.click = !this.click
    this.dropdown = this.click ? "dropdown-menu" : "hide"
  }

  async logout() {
    await this.loginService.logout()
  }

}
