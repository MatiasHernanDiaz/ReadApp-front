import { Component,OnInit } from '@angular/core'
import { LoginService } from '@src/app/services/Login/login.service'
import { UserService } from '@src/app/services/User/user.service'
import { Recommendation } from '@src/app/model/Recommendation'
import { User } from '@src/app/model/User'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'
import { RecomComponent } from '@src/app/components/recom/recom.component'

@Component({
  selector: 'app-recomstoevaluate',
  standalone: true,
  imports: [SpinnerComponent,RecomComponent],
  templateUrl: './recomstoevaluate.component.html',
  styleUrl: './recomstoevaluate.component.css'
})
export class RecomstoevaluateComponent implements OnInit {
  favoriteRecoms: Recommendation[] = []
  user: User = new User(-1, '', '', '', new Date(), '',undefined, [], [], [], 0)
  loading = true
  noFavorites = false

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.loginService.getSignedUser()!
    this.favoriteRecoms = this.user.favorites
    this.isLoading()
  }
  
  isLoading() {
    if (this.favoriteRecoms.length > 0) {
      this.loading = false
    } else {
      this.noFavorites = true 
      this.loading = false
    }
  }
  
  async toggleFavorite(recomId: number) {
    try {
      await this.userService.removeFavorite(this.user.id, recomId)
      this.user = User.fromUserJSON((await this.loginService.refreshSignedUser()).user)
      this.favoriteRecoms = this.user.favorites 
      window.alert('¡Eliminaste esta recomendación de tus favoritos con éxito!')
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error)
    }
  } 
  
}
