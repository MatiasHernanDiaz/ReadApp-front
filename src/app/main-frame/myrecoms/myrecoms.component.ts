import { Component } from '@angular/core'
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { RecomComponent } from '../../components/recom/recom.component'
import { RemoveRecomComponent } from '../../components/remove-recom/remove-recom.component'
import { CommonModule } from '@angular/common'
import { RecommendationService } from '@src/model/services/RecommendationService'
import { Recommendation } from '@src/model/Recommendation'


@Component({
  selector: 'app-myrecoms',
  standalone: true,
  imports: [SearchBarComponent, RecomComponent,RemoveRecomComponent,CommonModule],
  templateUrl: './myrecoms.component.html',
  styleUrl: './myrecoms.component.css'
})
export class MyrecomsComponent {
  recommendations: Array<Recommendation> = []
  dialogOpen = false
  recommendationId?: number

  constructor(private recommendationService: RecommendationService) {
    this.recommendationService.items.subscribe( (recomms) =>{
      this.recommendations = recomms
    })

  }

  async ngOnInit() {
    this.recommendationService.items = await this.recommendationService.fetchRecomms()
    console.log( 'lista de recom' , this.recommendations)
  }

  onDeleteRecom(id: number) {
    console.log('ID de la recomendación a eliminar:', id)
    this.recommendationId = id
    this.dialogOpen = true
  }

  closeDialog(): void {
    this.dialogOpen = false
  }
}
//TODO: deleteRecommendation(id: number) {
//   this.recommendations = this.recommendations.filter(item => item.id !== id)
//   }
