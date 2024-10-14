import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-btn-navigate',
  standalone: true,
  imports: [],
  templateUrl: './btn-navigate.component.html',
  styleUrl: './btn-navigate.component.css'
})
export class BtnNavigateComponent{
  
  @Input() data : {action:string, url:Array<string>} = {action:'action', url:[]}
  
  constructor(private router: Router){  }


  onClick(){
    this.router.navigate(this.data.url)
  }
}
