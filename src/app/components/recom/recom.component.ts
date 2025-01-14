import { Component, Input, Output, EventEmitter } from '@angular/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, 
  bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash, 
  bootstrapHeartFill} from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { Language, User } from '@src/app/model/User'
import { LoginService } from '@src/app/services/Login/login.service'
import { UserService } from '@src/app/services/User/user.service'
@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ heroUsers, bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash,bootstrapHeartFill })],
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {
  @Input() recommendation: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',Language.SPANISH,[],[],[], 0 ),[],false, [],0.0)
  
  @Output() onDeleteRecom = new EventEmitter<number>()
  url = ''
  user: User = new User(-1, '', '', '', new Date(),'', Language.SPANISH,[],[],[], 0 )
  constructor(
    private router: Router,
    private acRouter: ActivatedRoute,
    public loginService:LoginService,
    public userService:UserService
    ) {
    this.acRouter.url.subscribe((url) =>{
      this.url = url[0].path
    })
  }

  ngOnInit(){
    this.user = this.loginService.getSignedUser()!
  }

  goToDetail(id: number) {
    if(this.url === 'recomstoevaluate'){
      this.router.navigate(['app/recoms/', id])
    }else{
      this.router.navigate(['app/'+this.url+'/', id])
    }
  }

  removeRecom(id: number): void {
    this.onDeleteRecom.emit(id)
  }

  get isCreator(){
    return this.user.id === this.recommendation.creator.id
  }

  
  get countBooks(){
    return this.recommendation.books.length
  }
  get timeToRead(){
    return this.recommendation.time_to_read
  }

  get ratingAvg(){
    return this.recommendation.ratingsAvg.toFixed(2)
  }
  get recomReadTime(){
    return this.loginService.getSignedUser().recomReadTime(this.recommendation)
  }

  isFavorite(recomId:number) {
  return this.user.favorites.map(rec=>rec.id).includes(recomId)
}

async toggleFavorite(recomId: number) {
  try {
    if (this.user.favorites.map(rec => rec.id).includes(recomId)) {
      await this.userService.removeFavorite(this.user.id, recomId)
    } else {
      await this.userService.addFavorite(this.user.id, recomId)
    }
    this.user = User.fromUserJSON((await this.loginService.refreshSignedUser()).user)
  } catch (error) {
    console.error('Error al actualizar favoritos:', error)
  }
}

}