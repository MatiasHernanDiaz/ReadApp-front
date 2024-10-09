import { Recommendation, RecommendationJSON } from '@src/app/model/Recommendation'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { lastValueFrom } from 'rxjs'



@Injectable({ providedIn: 'root' })
export class RecommendationService {

    private apiUrl = 'http://localhost:9000/recommendations'

    constructor(private httpClient: HttpClient){}

    async fetchRecoms(id?: number, text?: string): Promise<Recommendation[]>{
      const url = this.apiUrl + (id ? '?id='+id : '') + (text ? '?text='+text : '')
      
      try{
        const recoms$ = this.httpClient.get<RecommendationJSON[]>(url)
        const recomsJSON = await lastValueFrom(recoms$)
        return recomsJSON.map((recommendarionJSON) => Recommendation.fromRecomendacionJSON(recommendarionJSON))
      }
      catch(error){
        console.error('Error fetching recommendations:', error)
        return []
      }
    }


    async getRecomm(id: number): Promise<Recommendation>{
      try{
        const recoms$ = this.httpClient.get<RecommendationJSON>(this.apiUrl + '/' + id)
        const recomsJSON = await lastValueFrom(recoms$)
        return Recommendation.fromRecomendacionJSON(recomsJSON)
      }
      catch(error){
        console.error('Error fetching recommendations:', error)
        return [][0] //nada, una chancada para salir del paso, despues lo pienso, si, me da verguenza
      }
    }
  
}