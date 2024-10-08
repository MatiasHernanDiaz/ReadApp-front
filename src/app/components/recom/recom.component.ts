import { Component, Input, Output, EventEmitter } from '@angular/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, 
  bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Recommendation } from '@src/model/Recommendation'
import { User } from '@src/model/User'

@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ heroUsers, bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash })],
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {
  @Input() recommendation: Recommendation = new Recommendation(0,'','',0,0,'',[],new User(0, '', '', '', new Date(),'',[],[],[], 0 ),[],false, [])
    //  solo una recomendación
  @Output() onDeleteRecom = new EventEmitter<number>()

  constructor(private router: Router) {}

  goToDetail(id: number) {
    this.router.navigate(['app/myrecoms/', id])
  }

  removeRecom(id: number): void {
    this.onDeleteRecom.emit(id)
  }
}
