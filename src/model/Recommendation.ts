import { User } from '@src/model/User'
import { Book } from '@src/model/Book'
import { ItemService } from './services/Service'

export type RecommendationJSON = {
    id: number
    title: string
    description: string
    rating: number
    books_count: number
    time_to_read: string
    comments: string[]
    creator: User
    books: Array<Book>
    isPublic: boolean
  }
  
  export class Recommendation implements ItemService {
    
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public rating: number,
      public books_count: number,
      public time_to_read: string,
      public comments: string[],
      public creator: User,
      public books: Array<Book>,
      public isPublic: boolean = false
    ) {}
  
    static fromRecomendacionJSON(recomendacionJSON: RecommendationJSON): Recommendation {
      return new Recommendation(
        recomendacionJSON.id,
        recomendacionJSON.title,
        recomendacionJSON.description,
        recomendacionJSON.rating,
        recomendacionJSON.books_count,
        recomendacionJSON.time_to_read,
        recomendacionJSON.comments,
        recomendacionJSON.creator,
        recomendacionJSON.books,
        recomendacionJSON.isPublic
      )
    }
  
    obtenerRatingConFormato(): string {
      return `${this.rating} estrellas`
    }
  
    obtenerDescripcionCorta(longitud: number = 100): string {
      return this.description.length > longitud? `${this.description.substring(0, longitud)}...`: this.description
    }



  //   class Recomendacion(
  //     private val creador: Usuario,
  //     private var resegna: String,
  //     private val libros: MutableSet<Libro> = mutableSetOf(),
  //     private var publica: Boolean = false
  // ) : ItemRepo {
  //     override var id: UInt? = null
  
  //     private val valoraciones: MutableList<Valoracion> = mutableListOf()
  //     private val observers: MutableSet<AddLibrosObserver> = mutableSetOf()
  
  //     init {
  //         creador.agregarRecomendacion(this)
  //         if(!libros.all { puedeAgregarLibro(creador, it) })
  //             throw Exception("La lista de libros no es válida.")
  //     }
  
  //     fun creador() = creador
  
  //     private fun puedeEditar(posibleEditor: Usuario): Boolean =
  //         posibleEditor === creador || (creador.esAmigo(posibleEditor) &&
  //                 posibleEditor.todosLosLibrosLeidos(this))
  
  //     private fun puedeAgregarLibro(editor: Usuario, libro: Libro) = editor.libroLeido(libro) &&
  //             creador.libroLeido(libro)
  
  //     private fun puedeValorar(valorador: Usuario) =
  //         valorador !== creador &&
  //                 (valorador.todosLosLibrosLeidos(this) ||
  //                         (libros.all { it.autor() === libros.first().autor() } &&
  //                                 valorador.esAutorPreferido(libros.first().autor())))
  
  //     fun cambiarPrivacidad(editor: Usuario) {
  //         if(puedeEditar(editor)) {
  //             publica = !publica
  //         } else {
  //             throw Exception("No es un editor válido")
  //         }
  //     }
  
  //     fun esPublica(): Boolean = publica
  
  //     fun editarResegna(editor: Usuario, nuevaResegna: String) {
  //         if(puedeEditar(editor)) {
  //             resegna = nuevaResegna
  //         } else {
  //             throw Exception("No es un editor válido")
  //         }
  //     }
  
  //     fun resegna(): String = resegna
  
  //     fun agregarLibro(editor: Usuario, nuevoLibro: Libro) {
  //         if(puedeEditar(editor) && puedeAgregarLibro(editor, nuevoLibro)) {
  //             libros.add(nuevoLibro)
  //         }
  //         else {
  //             throw Exception("No es un editor válido")
  //         }
  //         observers.forEach { it.libroAgregado(editor,nuevoLibro) }
  //     }
  
  //     fun eliminarLibro(editor: Usuario, libroAEliminar: Libro) {
  //         if(puedeEditar(editor)) {
  //             libros.remove(libroAEliminar)
  //         }
  //         else {
  //             throw Exception("No es un editor válido")
  //         }
  //     }
  
  //     fun libros(): MutableSet<Libro> = libros
  
  //     fun tiempoLecturaRecomendacion(usuario: Usuario): Double =
  //         libros.sumOf { usuario.tiempoLecturaLibro(it) }
  
  //     fun tiempoLecturaAhorrado(usuario: Usuario): Double =
  //         libros.filter { usuario.libroLeido(it) } .sumOf { usuario.tiempoLecturaLibro(it) }
  
  //     fun tiempoLecturaNeto(usuario: Usuario): Double =
  //         tiempoLecturaRecomendacion(usuario) - tiempoLecturaAhorrado(usuario)
  
  //     fun valoraciones() = valoraciones
  //     fun agregarValoracion(valoracion: Valoracion) {
  //         if(puedeValorar(valoracion.getAutor())) {
  //             valoraciones.add(valoracion)
  //         } else {
  //             throw Exception("No es un valorador válido")
  //         }
  //     }
  
  //     fun usuarioValoro(usuario: Usuario) = valoraciones.any { it.getAutor() === usuario }
  
  //     fun promedioValoraciones(): Double = valoraciones.map{ it.getPuntuacion() }.average()
  
  //     fun agregarAddLibrosObserver(observer: AddLibrosObserver){ observers.add(observer) }
  // }


  }
  