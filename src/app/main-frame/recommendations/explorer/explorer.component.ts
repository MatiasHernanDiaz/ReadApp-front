import { Component } from '@angular/core'
import { RecomComponent } from '../../../components/recom/recom.component'

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [RecomComponent],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.css'
})
export class ExplorerComponent {

  texts = ['Hola', 'Chau', '¿Cómo va?']

  get getTexts() { return this.texts }
}
