import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-msj',
  standalone: true,
  imports: [],
  templateUrl: './msj.component.html',
  styleUrl: './msj.component.css'
})
export class MsjComponent {
  @Input() error = {timestamp: '', status: 0, error: '', message: '', path: ''}
  @Input() msj = {title: '', btnMsj:''}

  @Output() close : EventEmitter<boolean> = new EventEmitter()
  
  ngOnInit(){
    console.log(this.error)
  }

  closeDialog(): void {
    this.close.emit(false)
  }
}
