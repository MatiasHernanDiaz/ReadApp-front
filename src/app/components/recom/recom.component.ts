import { Component, Input, Output, EventEmitter } from '@angular/core'
import { bootstrapBookmark, bootstrapStar, bootstrapBook, 
  bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash } from '@ng-icons/bootstrap-icons'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { heroUsers } from '@ng-icons/heroicons/outline'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Recommendation } from '@src/model/Recommendation'

@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [provideIcons({ heroUsers, bootstrapBookmark, bootstrapStar, bootstrapBook, bootstrapClock, bootstrapHeart, bootstrapArrowRight, bootstrapTrash })],
  templateUrl: './recom.component.html',
  styleUrls: ['./recom.component.css']
})
export class RecomComponent {
  @Input() recommendation: Recommendation =new Recommendation(0,'','',0,0,'',[])
    //  solo una recomendación
  @Output() onDeleteRecom = new EventEmitter<number>()

  constructor(private router: Router) {}

  goToDetail(id: number) {
    this.router.navigate(['app/recoms/recom-details/', id])
  }

  removeRecom(id: number): void {
    this.onDeleteRecom.emit(id)
  }
}
