import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Recommendation } from '@src/model/Recommendation'
import { ActivatedRoute } from '@angular/router'

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
  @Output() isPrivate: EventEmitter<boolean> = new EventEmitter()
  @Output() lookup: EventEmitter<string> = new EventEmitter<string>()
  userInput: string = ''

  constructor(private router: ActivatedRoute){
    this.router.data.subscribe((data)=>{
      this.myRecomsFlag = data['myrecoms']
    })
  }

  onlyPrivate($event: Event){
    this.isPrivate.emit(($event.target as HTMLInputElement).checked)
  }

  find(){
      this.lookup.emit(this.userInput)
  }

  async search( ev: { key: string} ) {
    if( ev.key === 'Enter' ) {
      this.lookup.emit(this.userInput)
    } else if( ev.key === 'Escape' ) {
      this.userInput = ''
    }
  }

}
