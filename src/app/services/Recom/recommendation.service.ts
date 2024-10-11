import { Recommendation, RecommendationJSON } from '@src/app/model/Recommendation'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { pathRecom } from '@src/app/model/Path'
import { Service } from '@src/app/services/AbstractService1'


@Injectable({ providedIn: 'root' })
export class RecommendationService extends Service<Recommendation> {

  recomid: number = 0 

    async fetchRecoms(userid?: number, text?: string): Promise<Recommendation[]>{
      const url = pathRecom.pathRecom(userid, text)
      const recoms$ = this.httpClient.get<RecommendationJSON[]>(url)
      const recomsJSON = await lastValueFrom(recoms$)
      return recomsJSON.map((recommendarionJSON) => Recommendation.fromRecomendacionJSON(recommendarionJSON))

    }

    async getRecomm(recomid: number): Promise<Recommendation>{
      const url = pathRecom.pathEntityId(recomid)
      const recoms$ = this.httpClient.get<RecommendationJSON>(url)
      const recomsJSON = await lastValueFrom(recoms$)
      return Recommendation.fromRecomendacionJSON(recomsJSON)
    }

    async updateRecomData(userId: number, recom: Recommendation): Promise<Recommendation>{
      const url = pathRecom.pathEntityCRUD(userId, recom.id, 'delete')
      const recoms$ = this.httpClient.post<RecommendationJSON>(url, recom)
      const recomsJSON = await lastValueFrom(recoms$)
      return Recommendation.fromRecomendacionJSON(recomsJSON)
    }
}
