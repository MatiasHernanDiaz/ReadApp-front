import { Component } from '@angular/core';
import { BookComponent } from '../../components/book/book.component'

@Component({
  selector: 'app-book-container',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './book-container.component.html',
  styleUrl: './book-container.component.css'
})
export class BookContainerComponent {
  books: any = [
    {title: "El libro de Bill", imageURL:"img/Book.jpg", autor:"Alex Hirsch", pages:"224", words:"15.000", date:"08/01/2024", lenguages:"Español-English", sales:"50.300"},
    {title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:"300", words:"2.200", date:"08/08/2024", lenguages:"Español", sales:"70.000"},
    {title: "Llamada de Cthulhu", imageURL:"https://data.livriz.com/media/MediaSpace/F9AFB48D-741D-4834-B760-F59344EEFF34/4/3b6448a7-76ec-4173-a173-9f04ff004233/9789878354521.jpg", autor:"H.P. Lovecraft", pages:"360", words:"60.000", date:"02/1928", lenguages:"Español-English-Français", sales:"1.000.000"},
    {title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:"300", words:"2.200", date:"08/08/2024", lenguages:"Español", sales:"70.000"},
    {title: "Gaturro Gigante", imageURL:"https://images.cdn2.buscalibre.com/fit-in/360x360/cd/12/cd120253f636098c134b6b21e2d9a3a3.jpg", autor:"Nik", pages:"300", words:"2.200", date:"08/08/2024", lenguages:"Español", sales:"70.000"},
  ]
}
