import { User } from '@src/app/model/User'
import { Book } from '@src/app/model/Book'
import { Rating } from '@src/app/model/rating'



export type RecommendationJSON = {
    id: number
    title: string
    description: string
    rating: number
    books_count: number
    time_to_read: string
    comments: string[]
    creator: User
    books: Array<Book>
    publicIs: boolean
    ratings: Array<Rating>
  }
  
  export type RecomJSON = {
     id: number 
     title: string
     description: string
     ratings: Array<Rating>
     books: Array<Book>
  }


  export class Recommendation  {
    
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public rating: number,
      public books_count: number,
      public time_to_read: string,
      public comments: string[],
      public creator: User,
      public books: Array<Book>,
      public publicIs: boolean,
      public ratings: Array<Rating>
    ) {}
  
    static fromRecomendacionJSON(recomendacionJSON: RecommendationJSON): Recommendation {
      return new Recommendation(
        recomendacionJSON.id,
        recomendacionJSON.title,
        recomendacionJSON.description,
        recomendacionJSON.rating,
        recomendacionJSON.books_count,
        recomendacionJSON.time_to_read,
        recomendacionJSON.comments,
        recomendacionJSON.creator,
        recomendacionJSON.books,
        recomendacionJSON.publicIs,
        recomendacionJSON.ratings
      )
    }

    
  
    obtenerRatingConFormato(): string {
      return `${this.rating} estrellas`
    }
  
    obtenerDescripcionCorta(longitud: number = 100): string {
      return this.description.length > longitud? `${this.description.substring(0, longitud)}...`: this.description
    }

  }
