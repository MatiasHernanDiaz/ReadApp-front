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
  @Output() confirmDelete = new EventEmitter<number>() 
  @Input() recommendationId?: number

  closeDialog(): void {
    console.log("Cierro el evento")
    this.close.emit() 
  }
  onConfirm(): void {
    console.log('recom', this.recommendationId)
    if (this.recommendationId !== undefined) {
      this.confirmDelete.emit(this.recommendationId) 
    }
    this.close.emit()
  }
}