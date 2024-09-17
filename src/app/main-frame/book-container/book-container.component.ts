import { Component } from '@angular/core'
import { BookComponent } from '../../components/book/book.component'
import { Book } from '../../../model/Book'

@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {

  books: Book[] = [
    {title: "El libro de Bill", imageURL:"assets/Book.jpg", autor:"Alex Hirsch", pages:224, words:15000, date:new Date(2024,8,1), lenguages:"Español-English", sales:50300},
    {title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:300, words:2200, date:new Date(2024,8,8), lenguages:"Español", sales:70000},
    {title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:360, words:60000, date:new Date(1928,2,2), lenguages:"Español-English-Français", sales:1000000},
    { title: "Dragon Ball", imageURL: "https://acdn.mitiendanube.com/stores/001/455/161/products/dragon-ball-saga-freezer-05-ivrea-manga-viducomics-akira-toriyama-toyotaro-z-gt-super-49e3b537e0176388f517111400543922-480-0.jpg", autor: "Akira Toriyama", pages: 360, words: 6000, date: new Date(1984, 3, 10), lenguages: "Español- Japonés", sales: 850000 },
    { title: "Historia del arte", imageURL: "https://m.media-amazon.com/images/I/81sawrUEiYL._AC_UF894,1000_QL80_.jpg", autor: "Ernst Gombrich", pages: 700, words: 78000, date: new Date(1950, 1, 1), lenguages: "Español-English", sales: 597400 }
  ]
}
