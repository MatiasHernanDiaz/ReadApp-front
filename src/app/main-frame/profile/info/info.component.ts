import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../model/User';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  user = new User(
    "Simpson", "Homero", "homeros", new Date( '1974-10-10' ), "homero@simpson", 100
  )

  get birthday() { return this.user.birthday.toISOString().slice(0, 10) }
}

