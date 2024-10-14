import { Component, Input, Output  } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { bootstrapPlusCircleFill, bootstrapStar, bootstrapStarFill } from '@ng-icons/bootstrap-icons'
import { provideIcons, NgIconComponent } from '@ng-icons/core'
import { RatingWithId } from '@src/app/model/rating'

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
  @Output() ratingRanking: RatingWithId = {creatorId:-1,description:'',rating:0}

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
    console.log(this.stars)
  }

  save(){
    this.ratingRanking.description = this.text
    console.log(this.ratingRanking)
  }

}
