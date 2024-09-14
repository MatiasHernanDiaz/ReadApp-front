import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'recommendations-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet, SearchBarComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsScreen {
}