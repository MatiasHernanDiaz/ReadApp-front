import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BookComponent } from '../book/book.component'

@Component({
  selector: 'recommendations-screen',
  standalone: true,
  imports: [FormsModule, BookComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsScreen {
}