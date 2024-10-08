import { Component, EventEmitter, Output } from '@angular/core'
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
  @Output() isPrivate: EventEmitter<boolean> = new EventEmitter()

  constructor(private router: ActivatedRoute){
    this.router.data.subscribe((data)=>{
      this.myRecomsFlag = data['myrecoms']
    })
  }

  onlyPrivate($event: Event){
    console.log(this.isPrivate)
    this.isPrivate.emit(($event.target as HTMLInputElement).checked)
  }

  async sendLookup(){
    console.log('terminar')
  }

}
