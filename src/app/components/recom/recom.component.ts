import { Component, Input, Output, EventEmitter } from '@angular/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, 
  bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { Recommendation } from '@src/app/model/Recommendation'
import { Language, User } from '@src/app/model/User'

@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ heroUsers, bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash })],
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {
  @Input() recommendation: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',Language.SPANISH,[],[],[], 0 ),[],false, [])
    //  solo una recomendación
  @Output() onDeleteRecom = new EventEmitter<number>()
  url = ''
  constructor(private router: Router, private acRouter: ActivatedRoute) {
    this.acRouter.url.subscribe((url) =>{
      this.url = url[0].path
    })
  }

  goToDetail(id: number) {
    this.router.navigate(['app/'+this.url+'/', id])
  }

  removeRecom(id: number): void {
    this.onDeleteRecom.emit(id)
  }
}
