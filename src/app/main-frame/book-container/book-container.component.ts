import { Component } from '@angular/core';
import { BookComponent } from '../../components/book/book.component'

@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './book-container.component.html',
  styleUrl: '/src/css/card-container.css'
})
export class BookContainerComponent {

}
