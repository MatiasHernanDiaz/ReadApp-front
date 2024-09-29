import { Component, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Recommendation } from '@src/model/Recommendation'
import { ActivatedRoute } from '@angular/router'
//import { RecommendationService } from '@src/model/services/RecommendationService'


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() recommendations: Recommendation[] = []
  myRecomsFlag: boolean = location.pathname.includes('myrecoms')
  @Output() lookup: string = ''

  constructor(private router: ActivatedRoute){
    this.router.data.subscribe((data: any)=>{
      this.myRecomsFlag = data.myrecoms
    })
  }

  async sendLookup(){
    //aca va de una a buscar todo lo que hay, no filtra nada.
    //alert(this.lookup)
    // if(this.lookup.length > 3){
    //   this.recommendations = await this.recommendationService.getRecommendations()
    //   console.log(this.recommendations)
    // }
    // else{
    //   alert('Debe ser una palabra mayor a 3 letras(a definir)')
    // }
    console.log('terminar')
  }

}
