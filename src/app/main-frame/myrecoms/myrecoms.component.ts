import { Component } from '@angular/core'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import { RecomComponent } from '@src/app/components/recom/recom.component'
import { RemoveRecomComponent } from '@src/app/components/remove-recom/remove-recom.component'
import { CommonModule } from '@angular/common'
import {RecommendationService} from '@src/app/services/Recom/recommendation.service'
import { Recommendation } from '@src/app/model/Recommendation'
import { ActivatedRoute, Router } from '@angular/router'
import { SpinnerComponent } from '@src/app/components/spinner/spinner.component'
import { LoginService } from '@src/app/services/Login/login.service'
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { AddRecomComponent } from '@src/app/components/add-recom/add-recom.component'


@Component({
  selector: 'app-myrecoms',
  standalone: true,
  imports: [SearchBarComponent, RecomComponent,RemoveRecomComponent,CommonModule, SpinnerComponent, NgIconComponent, AddRecomComponent],
  viewProviders: [provideIcons({ bootstrapPlusCircleFill })],
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


  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, public loginService: LoginService, private route: Router) {
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
    this.recommendationService.items = await this.recommendationService.fetchRecoms(
      this.myRecomsFlag ? this.loginService.getSignedUser()!.id : undefined, text)
  }

  addRecom(){
    this.route.navigate(['app/myrecoms/-1'])
  }

  async onConfirmDelete(recomId: number) {
    const userId = this.loginService.getSignedUser()!.id 
    await this.recommendationService.deleteRecom(userId, recomId) 
    this.dialogOpen = false
    this.recommendationId = undefined 
    this.goToFind('') 
  }

}
