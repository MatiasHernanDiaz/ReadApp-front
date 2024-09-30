import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"

@Injectable({ providedIn: 'root' })
export abstract class Service<T extends ItemService>{

    
    protected _items: BehaviorSubject<Array<T>> = new BehaviorSubject<Array<T>>([])
    protected _items$ = this._items.asObservable()
    
    // constructor() {
    //     this._items 
    // }


    // itemById(id: number): T|undefined {
    //     return this.items.find( item => item.id === id)
    // }

    // addItem(item: T){
    //     if(this.itemById(item.id)){
    //         throw Error('El elemento ya existe')
    //     }
    //     this.items.push(item)
    // }

    get items(): Observable<Array<T>> {
        return this._items$
    }

    set items(newValue: Array<T>) {
        this._items.next( newValue )
    }

} 

//     fun actualizarItem(item: T) {
//         if (!existeItem(item)) {
//             throw Exception("No hay un item con ese ID en el repositorio.")
//         }

//         items.removeIf { it.id == item.id }
//         items.add(item)
//     }

//     fun eliminarItem(item: T) {
//         if (!existeItem(item)) {
//             throw Exception("No hay un item con ese ID en el repositorio.")
//         }
//         items.removeIf { it.id == item.id }
//     }


//     fun itemPorId(id: UInt): T? = items.find { it.id == id }


//     abstract fun buscarItems(patron: String): List<T>

//     fun ejecutarAccion(accion: AccionRepositorio) {
//         accion.ejecutar()
//     }

//     fun items() = items

//     fun limpiarParaTest() = items.clear()
// }



export interface ItemService{
    id: number
}

