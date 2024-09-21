import { Component } from '@angular/core'
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { RecomComponent } from '../../components/recom/recom.component'
import { RemoveRecomComponent } from '../../components/remove-recom/remove-recom.component'
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-myrecoms',
  standalone: true,
  imports: [SearchBarComponent, RecomComponent,RemoveRecomComponent,CommonModule],
  templateUrl: './myrecoms.component.html',
  styleUrl: './myrecoms.component.css'
})
export class MyrecomsComponent {

 dialogOpen = false 
 recommendationId?: number
 onDeleteRecom(id: number) {
  console.log('ID de la recomendación a eliminar:', id)
  this.recommendationId = id
  this.dialogOpen = true
}


closeDialog(): void {
  this.dialogOpen = false // Cierra el diálogo.
}
openDialog(): void {
  this.dialogOpen = true 
}
// deleteRecommendation(id: number) {
//   this.recommendations = this.recommendations.filter(item => item.id !== id)
//   }

}