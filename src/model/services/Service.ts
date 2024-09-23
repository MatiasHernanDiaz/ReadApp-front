import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })
export abstract class Service<T extends ItemService>{

    protected _items: Array<T> = []

    itemById(id: number): T|undefined {
        return this.items.find( item => item.id === id)
    }

    addItem(item: T){
        if(this.itemById(item.id)){
            throw Error('El elemento ya existe')
        }
        this.items.push(item)
    }

    get items(){
        return this._items
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

}

export interface ItemService{
    id: number
}

