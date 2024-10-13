import { Component } from '@angular/core'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import { RecomComponent } from '@src/app/components/recom/recom.component'
import { RemoveRecomComponent } from '@src/app/components/remove-recom/remove-recom.component'
import { CommonModule } from '@angular/common'
import { RecommendationService } from '@src/app/services/RecommendationService'
import { Recommendation } from '@src/app/model/Recommendation'
import { ActivatedRoute } from '@angular/router'
import { StubLoginService } from '@src/app/services/UserService'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'


@Component({
  selector: 'app-myrecoms',
  standalone: true,
  imports: [SearchBarComponent, RecomComponent,RemoveRecomComponent,CommonModule, SpinnerComponent],
  templateUrl: './myrecoms.component.html',
  styleUrl: './myrecoms.component.css'
})
export class MyrecomsComponent {
  recommendations: Array<Recommendation> = []
  dialogOpen = false
  recommendationId?: number
  myRecomsFlag = false
  private = false
  find = ''
  loading = true


  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, private userService: StubLoginService) {
    this.recommendationService.items.subscribe( (recomms) =>{
      this.recommendations = recomms
      this.isLoading()
    })
    this.router.data.subscribe((data)=>{this.myRecomsFlag = data['myrecoms']})
  }
  
  isLoading(){
    if(this.recommendations.length >0){
      this.loading = false
    }
  }

  async ngOnInit() {
    this.goToFind('')
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

  async goToFind(text: string){
    this.recommendationService.items = await this.recommendationService.fetchRecoms(this.myRecomsFlag ? this.userService.getSignedUser().id : undefined, text)
  }

}
