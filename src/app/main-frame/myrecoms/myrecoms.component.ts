import { Component } from '@angular/core'
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { RecomComponent } from '../../components/recom/recom.component'
import { RemoveRecomComponent } from '../../components/remove-recom/remove-recom.component'
import { CommonModule } from '@angular/common'
import { RecommendationService } from '@src/services/RecommendationService'
import { Recommendation } from '@src/model/Recommendation'
import { ActivatedRoute } from '@angular/router'
import { StubLoginService } from '@src/services/UserService'


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
  myRecomsFlag = false
  private = false


  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, private userService: StubLoginService) {
    this.recommendationService.items.subscribe( (recomms) =>{
      this.recommendations = recomms
    })
    this.router.data.subscribe((data)=>{this.myRecomsFlag = data['myrecoms']})
  }

  async ngOnInit() {
    this.recommendationService.items = await this.recommendationService.fetchRecoms(this.myRecomsFlag ? this.userService.getSignedUser().id : undefined)
    //console.log( 'lista de recom' , this.private)
  }

  onDeleteRecom(id: number) {
    console.log('ID de la recomendación a eliminar:', id)
    this.recommendationId = id
    this.dialogOpen = true
  }

  closeDialog(): void {
    this.dialogOpen = false
  }

  setPrivate(evPrivate: boolean){
    this.private = evPrivate
  }

}
