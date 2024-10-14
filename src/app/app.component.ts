import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { LoginService } from './services/Login/login.service'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReadApp7'

  constructor( private loginService: LoginService, private router: Router ) {}

  async ngOnInit() {
    const res = await this.loginService.refreshSignedUser()

    if( res.login ) {
      this.router.navigate(['app', 'recoms'])
    } else {
      this.router.navigate(['login'])
    }
  }

}
