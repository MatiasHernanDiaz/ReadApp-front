import { Component } from '@angular/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { Output,EventEmitter,Input } from '@angular/core'
@Component({
  selector: 'app-remove-recom',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './remove-recom.component.html',
  styleUrl: './remove-recom.component.css'
})
export class RemoveRecomComponent {

  @Output() close = new EventEmitter<void>()
  @Output() confirmDelete = new EventEmitter<number>() // Emitirá el ID de la recomendación
  @Input() recommendationId?: number

  confirmDeletes() {
    // const idUser = localStorage.getItem('signedUser')

    // console.log('idUser', this.recommendationId)
    // console.info('usuario',idUser)
  }
  closeDialog(): void {
    console.log("Cierro el evento")
    this.close.emit() // cierra el evento
  }
  onConfirm(): void {
    //const idUser = localStorage.getItem('signedUser')
    console.log('recom', this.recommendationId)
    if (this.recommendationId !== undefined) {
      this.confirmDelete.emit(this.recommendationId) // Emitimos el ID de la recomendación
    }
    this.close.emit()
  }
}