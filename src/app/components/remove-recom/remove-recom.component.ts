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
  //recibe datos que se van a mostrar en el dialog
  @Output() close = new EventEmitter<void>()//nuevo evento modal
  @Input() recommendationId?: number

  confirmDelete() {
    console.log('Eliminar recomendación con ID:', this.recommendationId)
  }
  closeDialog(): void {
    console.log("Cierro el evento")
    this.close.emit() // cierra el evento
  }
  onConfirm(): void {
    console.log("Elimino la card")
    this.close.emit() 
  }
}