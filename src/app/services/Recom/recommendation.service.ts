import { Recommendation, RecommendationJSON } from '@src/app/model/Recommendation'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { pathRecom } from '@src/app/model/Path'
import { Service } from '@src/app/services/AbstractService1'
import { RecomEdit, JSONRecomEdit } from '@src/app/model/RecomEdit'
import { RatingWithId } from '@src/app/model/rating'


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
      const url = pathRecom.pathEntityCRUD(userId, recom.id, 'update')
      const recoms$ = this.httpClient.post<RecommendationJSON>(url, recom)
      const recomsJSON = await lastValueFrom(recoms$)
      return Recommendation.fromRecomendacionJSON(recomsJSON)
    }

    async updateRecomEdit(userId: number, recom: RecomEdit): Promise<RecomEdit>{
      const url = pathRecom.pathEntityCRUD(userId, recom.id, 'update')
      console.log('url ',url)
      const recoms$ = this.httpClient.put<JSONRecomEdit>(url, recom)
      const recomsJSON = await lastValueFrom(recoms$)
      return RecomEdit.fromRecomEditJSON(recomsJSON)
    }

    async createRating(recomid: number, rating: RatingWithId): Promise<Recommendation>{
      const url = pathRecom.ratingCRUD(recomid, 'create')
      console.log(url)
      const recom$ = this.httpClient.post<RecommendationJSON>(url, rating)
      const recomJSON = await lastValueFrom(recom$)
      return  Recommendation.fromRecomendacionJSON(recomJSON)
    }

    async createRecom(newRecom: {userid:number, title:string}): Promise<Recommendation>{
      const url = pathRecom.recomCreate()
      const recom$ = this.httpClient.post<RecommendationJSON>(url, newRecom)
      const recomsJSON = await lastValueFrom(recom$)
      return Recommendation.fromRecomendacionJSON(recomsJSON)
    }

    async canRating(userid: number, recomid: number): Promise<string>{
      const url = pathRecom.canRating(userid, recomid)
      console.log('>>>>>>>>>>>>>>>>>',url)
      const canRating$ = this.httpClient.get<string>(url)
      const _canRating = await lastValueFrom(canRating$)
      return _canRating 
    }

    async deleteRecom(userId: number, recomid: number): Promise<void> {
      const url = pathRecom.pathEntityCRUD(userId, recomid, 'delete')
      const recoms$ = this.httpClient.delete<void>(url)
      return await lastValueFrom(recoms$)
    }
}
