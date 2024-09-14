import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() name: String = 'Homero Simpson';
  @Input() img: String = 'assets/avatar.jpeg';
  click: boolean = false;
  dropdown: String = "hide"

  handleClickMenu(){
    this.click = !this.click;
    this.dropdown = this.click ? "dropdown-menu" : "hide";
  }

}
