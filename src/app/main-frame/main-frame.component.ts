import { Component } from '@angular/core'
import { HeaderComponent } from "../components/header/header.component"
import { RouterOutlet } from '@angular/router'


@Component({
  selector: 'app-main-frame',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './main-frame.component.html',
  styleUrl: './main-frame.component.css'
})
export class MainFrameComponent {
  


}
