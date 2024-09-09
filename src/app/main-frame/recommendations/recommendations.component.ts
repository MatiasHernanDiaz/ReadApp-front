import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'recommendations-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsScreen {
  
}