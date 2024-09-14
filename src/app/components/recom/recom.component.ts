import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-recom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recom.component.html',
  styleUrl: './recom.component.css'
})
export class RecomComponent {
  @Input() text: string = "Sin texto"

  get getText() { return this.text }
}
