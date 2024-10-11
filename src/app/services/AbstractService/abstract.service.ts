import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"

@Injectable({ providedIn: 'root' })
export abstract class Service<T extends ItemService>{

    protected _items: BehaviorSubject<Array<T>> = new BehaviorSubject<Array<T>>([])
    protected _items$ = this._items.asObservable()

    constructor(protected httpClient: HttpClient){}

    get items(): Observable<Array<T>> {
        return this._items$
    }

    set items(newValue: Array<T>) {
        this._items.next( newValue )
    }

} 

export interface ItemService{
    id: number
}