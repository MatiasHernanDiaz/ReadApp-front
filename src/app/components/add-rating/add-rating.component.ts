import { Component, EventEmitter, Input, Output  } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { bootstrapPlusCircleFill, bootstrapStar, bootstrapStarFill } from '@ng-icons/bootstrap-icons'
import { provideIcons, NgIconComponent } from '@ng-icons/core'
import { RatingWithId } from '@src/app/model/rating'
import { LoginService } from '@src/app/services/Login/login.service'
import { RecommendationService } from '@src/app/services/Recom/recommendation.service'

@Component({
  selector: 'app-add-rating',
  standalone: true,
  imports: [NgIconComponent, FormsModule ],
  templateUrl: './add-rating.component.html',
  viewProviders: [provideIcons({ bootstrapPlusCircleFill, bootstrapStar,bootstrapStarFill })],
  styleUrl: './add-rating.component.css'
})
export class AddRatingComponent {
  //@Input() error = {timestamp: '', status: 0, error: '', message: '', path: ''}
  //@Input() msj = {title: '', btnMsj:''}
  @Input() userId: number = -1
  @Input() recomid: number = -1
  ratingRanking: RatingWithId = {creatorId:-1,description:'',rating:0}
  @Output() refresh = new EventEmitter<void>()

  constructor(private recomService: RecommendationService, public loginService: LoginService){}

  text = ''
  stars: Array<{id:number, name:string}> = [
    { id: 1, name: 'bootstrapStar' },
    { id: 2, name: 'bootstrapStar' },
    { id: 3, name: 'bootstrapStar' },
    { id: 4, name: 'bootstrapStar' },
    { id: 5, name: 'bootstrapStar' }
  ]
  displaySelector = false
  
  ngOnInit(){
   console.log('id de recom ',this.recomid)
  }

  closeDialog(): void {
    this.text = ''
    this.stars=[
      { id: 1, name: 'bootstrapStar' },
      { id: 2, name: 'bootstrapStar' },
      { id: 3, name: 'bootstrapStar' },
      { id: 4, name: 'bootstrapStar' },
      { id: 5, name: 'bootstrapStar' }
    ]
    this.displaySelector = false
  }

  toggleSelector(){
    this.displaySelector = !this.displaySelector 
  }

  starRanking(selectedStar: number): void {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < selectedStar) {
        this.stars[i].name = 'bootstrapStarFill'
      } else {
        this.stars[i].name = 'bootstrapStar'
      }
    }
    this.ratingRanking.rating = selectedStar
  }

  save(){
    this.ratingRanking.description = this.text
    const userid = this.loginService.getSignedUser().id
    this.ratingRanking.creatorId = userid
    this.recomService.createRating(userid, this.recomid, this.ratingRanking)
    this.refresh.emit()
    this.closeDialog()
  }

}
