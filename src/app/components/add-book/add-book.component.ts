import { Component, Input} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { bootstrapPlusCircleFill } from '@ng-icons/bootstrap-icons'
import { provideIcons, NgIconComponent } from '@ng-icons/core'

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [NgIconComponent, FormsModule ],
  templateUrl: './add-book.component.html',
  viewProviders: [provideIcons({ bootstrapPlusCircleFill})],
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  @Input()
  url:string = ''


  constructor(private router: Router) { }

  goToAdd() {
    this.router.navigate(['app/' + this.url])
  }
}
