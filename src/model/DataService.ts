import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private data = new BehaviorSubject<{ myrecom: boolean }>({ myrecom: false })
  currentData = this.data.asObservable()

  // Método para actualizar los datos
  updateData(newData: { myrecom: boolean }) {
    this.data.next(newData)
    console.log('cambio de estado ', this.data)
  }

  getData(){
    return this.data
  }
}
