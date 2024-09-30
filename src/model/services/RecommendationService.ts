import { Service } from '@src/model/services/Service'
import { Recommendation, RecommendationJSON } from '@src/model/Recommendation'
import { Injectable } from '@angular/core'
import axios  from 'axios'


@Injectable({ providedIn: 'root' })
export class RecommendationService extends Service<Recommendation>{

    private apiUrl = 'https://private-5b78cb-recommendations11.apiary-mock.com/recommendations'

    // async ngOnInit(){
    //     this._items = await this.fetchRecomms()
    //     console.log('en el servicio =>', this._items)
    //   }

    // async ngOnInit(){
    //   this.items = await this.fetchRecomms()
    // }
    

    async fetchRecomms(){
        try {
            const response = await axios.get(this.apiUrl)
      
            const recomendations = response.data.map((recomendacionJSON: RecommendationJSON) =>
              Recommendation.fromRecomendacionJSON(recomendacionJSON)
          ) 
            console.log('y aca tenes algo??' , recomendations)
            return recomendations
          } catch (error) {
            console.error('Error fetching recommendations:', error)
            return []
          }
    }

}