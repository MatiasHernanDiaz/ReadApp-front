import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { User } from '@src/app/model/User'
import { RecommendationService } from '@src/app/services/RecommendationService'
import { RatingComponent } from '@src/app/components/rating/rating.component'
import { StubLoginService } from '@src/app/services/UserService'
import { CommonModule } from '@angular/common'
import { BookComponent } from '@src/app/components/book/book.component'
import { BtnNavigateComponent } from "../../../components/btn-navigate/btn-navigate.component"


@Component({
  selector: 'app-recomdetails',
  standalone: true,
  imports: [RatingComponent, CommonModule, BookComponent, BtnNavigateComponent],
  templateUrl: './recomdetails.component.html',
  styleUrl: './recomdetails.component.css'
})
export class RecomdetailsComponent {

  volver = {action:'Volver', url:['app/myrecoms']}
  
  recom: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',[],[],[], 0 ),[],false, [])
  id!: number

  constructor(private recommendationService: RecommendationService, private router: ActivatedRoute, public loginService: StubLoginService){ 
    this.router.params.subscribe((params)=>{
      this.id = params['id']
      console.info(params['id'])
      console.info(this.id)
    })

    this.router.url.subscribe((u) => {
      this.volver.url = ['app/'+u[0].path]
      console.log('acaaaa ', ['app/'+u[0].path])
      console.log(this.volver)
    })

   }


  async ngOnInit(){
    this.recom = await this.recommendationService.getRecomm(this.id)
    console.info(this.recom)
  }
  
  

}
