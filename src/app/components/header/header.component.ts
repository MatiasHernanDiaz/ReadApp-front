import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { User } from '@src/model/User'
import { StubLoginService } from '@src/services/UserService'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user: User = new User( '', '', '', new Date(), '',[],[],[], 0 , )
  click: boolean = false
  dropdown: string = "hide"
  
  constructor( public loginService: StubLoginService ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
  }


  handleClickMenu(){
    this.click = !this.click
    this.dropdown = this.click ? "dropdown-menu" : "hide"
  }

}
