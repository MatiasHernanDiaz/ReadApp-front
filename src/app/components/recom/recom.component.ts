import { Component } from '@angular/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock,
   bootstrapHeart,bootstrapArrowRight,bootstrapTrash } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { RemoveRecomComponent } from '../remove-recom/remove-recom.component'
import { Output, EventEmitter,Input } from '@angular/core'
import { RecommendationService } from '@src/app/services/recom.service'
import { Recommendation } from '@src/model/Recommendation'

@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [RemoveRecomComponent,NgIconComponent,CommonModule],
  viewProviders: [provideIcons({  heroUsers,bootstrapBookmark, bootstrapStar,
     bootstrapBook, bootstrapClock, bootstrapHeart,bootstrapArrowRight,bootstrapTrash })],
  templateUrl: './recom.component.html',
  styleUrl: './recom.component.css'
})
export class RecomComponent {
  @Input() recommendations: Recommendation[] = []
  @Output() onDeleteRecom = new EventEmitter<number>()

  constructor(private router: Router,private recommendationService: RecommendationService) {}
  
  async ngOnInit() {
    this.recommendations = await this.recommendationService.getRecommendations()
  }

  goToDetail(id: number) {
    console.log('id',id)
    console.log(this.router)
    this.router.navigate(['app/recoms/recom-details/',id])
  }

 

removeRecom(id: number): void {
console.log(id)
this.onDeleteRecom.emit(id) // consolea la recomendación



}


}