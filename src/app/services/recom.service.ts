import { Injectable } from '@angular/core'
import axios from 'axios'
import { Recommendation, RecommendationJSON } from '../../model/Recommendation'

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'https://private-5b78cb-recommendations11.apiary-mock.com/recommendations'//listo para poner el back

  async getRecommendations(): Promise<Recommendation[]> {
    try {
      const response = await axios.get(this.apiUrl)

      const recomendations = response.data.map((recomendacionJSON: RecommendationJSON) =>
        Recommendation.fromRecomendacionJSON(recomendacionJSON)
    )
      return recomendations
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      return []
    }
  }
}