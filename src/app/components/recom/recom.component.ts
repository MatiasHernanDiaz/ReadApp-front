import { Component, Input, Output, EventEmitter } from '@angular/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, 
  bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { Language, User } from '@src/app/model/User'
import { LoginService } from '@src/app/services/Login/login.service'

@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ heroUsers, bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash })],
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {
  @Input() recommendation: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',Language.SPANISH,[],[],[], 0 ),[],false, [])
    //  solo una recomendación
  @Output() onDeleteRecom = new EventEmitter<number>()
  url = ''
  userIdLogin: number = -1


  constructor(private router: Router, private acRouter: ActivatedRoute, public loginService:LoginService) {
    this.acRouter.url.subscribe((url) =>{
      this.url = url[0].path
    })
  }

   ngOnInit(){
    this.userIdLogin = this.loginService.getSignedUser().id
  }

  goToDetail(id: number) {
    this.router.navigate(['app/'+this.url+'/', id])
  }

  removeRecom(id: number): void {
    this.onDeleteRecom.emit(id)
  }

  get isCreator(){
    return this.userIdLogin === this.recommendation.creator.id
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
}
