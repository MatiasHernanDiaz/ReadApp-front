import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  myRecomsFlag: boolean = location.pathname.includes('myrecoms')

  lookup: string = ''

  getLookup(){
    alert(this.lookup)
  }

}
