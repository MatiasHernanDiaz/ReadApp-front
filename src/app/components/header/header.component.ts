import { Component, Input } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { DataService } from '@src/model/DataService'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() name: string = 'Homero Simpson'
  @Input() img: string = 'assets/avatar.jpeg'
  click: boolean = false
  dropdown: string = "hide"

  constructor(public dataService: DataService){}

  handleClickMenu(){
    this.click = !this.click
    this.dropdown = this.click ? "dropdown-menu" : "hide"
  }

  goToMyRecoms(){
    this.dataService.updateData({myrecom:true})
  }

  goToRecoms(){
    this.dataService.updateData({myrecom:false})
  }

}
