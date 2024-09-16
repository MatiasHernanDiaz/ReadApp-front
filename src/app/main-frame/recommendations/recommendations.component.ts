import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SearchBarComponent } from '@src/app/components/search-bar/search-bar.component'
import {  RouterOutlet } from '@angular/router'


@Component({
  selector: 'recommendations-screen',
  standalone: true,
  imports: [FormsModule, RouterOutlet, SearchBarComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsScreen {

  myRecomsFlag: boolean = location.pathname.includes('myrecoms')
  
}