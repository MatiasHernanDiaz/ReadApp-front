import { Recommendation, RecommendationJSON } from '@src/app/model/Recommendation'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { PathRecom } from '@src/app/model/Recommendation'
import { Service } from './AbstractService'



@Injectable({ providedIn: 'root' })
export class RecommendationService extends Service<Recommendation> {

  recomid: number = 0 

    async fetchRecoms(userid?: number, text?: string): Promise<Recommendation[]>{
      const url = PathRecom.pathRecom(userid, text)
        const recoms$ = this.httpClient.get<RecommendationJSON[]>(url)
        const recomsJSON = await lastValueFrom(recoms$)
        return recomsJSON.map((recommendarionJSON) => Recommendation.fromRecomendacionJSON(recommendarionJSON))

    }


    async getRecomm(recomid: number): Promise<Recommendation>{
      const url = PathRecom.pathRecomId(recomid)
        const recoms$ = this.httpClient.get<RecommendationJSON>(url)
        const recomsJSON = await lastValueFrom(recoms$)
        return Recommendation.fromRecomendacionJSON(recomsJSON)
    }
  
}