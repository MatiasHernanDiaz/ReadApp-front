import { Service } from '@src/services/Service'
import { Recommendation, RecommendationJSON } from '@src/model/Recommendation'
import { Injectable } from '@angular/core'
import axios  from 'axios'
import { HttpClient } from '@angular/common/http'


@Injectable({ providedIn: 'root' })
export class RecommendationService extends Service<Recommendation>{

    //https://app.apiary.io/mockrecomms/editor
    private apiUrl = 'http://localhost:9000/recommendations'

    constructor(private httpClient: HttpClient){
      super()
    }

    async getAllRecoms(){
      this.httpClient.get<RecomJSON[]>('http://localhost:9000/recommendations')
    }

    async fetchRecomms(){
        try {
            const response = await axios.get(this.apiUrl)
      
            const recomendations = response.data.map((recomendacionJSON: RecommendationJSON) =>
              Recommendation.fromRecomendacionJSON(recomendacionJSON)
          ) 
            console.info('y aca tenes algo??' , recomendations)
            return recomendations
          } catch (error) {
            console.error('Error fetching recommendations:', error)
            return []
          }
    }

    async getRecomm(id: number){
      try{
        const response = await axios.get(this.apiUrl)
        const recomendations = response.data.map((recomendacionJSON: RecommendationJSON) =>
          Recommendation.fromRecomendacionJSON(recomendacionJSON))
        return  recomendations[id]
      }
      catch(error){
        console.error('Error fetching recommendations:', error)
        return []
      }
    }

}