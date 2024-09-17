import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from "../components/header/header.component"

@Component({
  selector: 'app-main-frame',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main-frame.component.html',
  styleUrl: './main-frame.component.css'
})
export class MainFrameComponent {
  
}
