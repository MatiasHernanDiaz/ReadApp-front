import { User } from '@src/app/model/User'
import { Book } from '@src/app/model/Book'
import { RatingWithId } from '@src/app/model/rating'



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
    ratings: Array<RatingWithId>
    ratingsAvg: number 
  }
  
  export type RecomJSON = {
     id: number 
     title: string
     description: string
     ratings: Array<RatingWithId>
     books: Array<Book>
     ratingsAvg: number
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
      public ratings: Array<RatingWithId>,
      public ratingsAvg: number = 0.0
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
        recomendacionJSON.books.map( bo => new Book(
          bo.pages,
          bo.title,
          bo.imageURL,
          bo.autor,
          bo.words,
          bo.date,
          bo.lenguages,
          bo.sales,
          bo.id
        )),
        recomendacionJSON.publicIs,
        recomendacionJSON.ratings,
        recomendacionJSON.ratingsAvg
      )
    }

    
  
    obtenerRatingConFormato(): string {
      return `${this.rating} estrellas`
    }
  
    obtenerDescripcionCorta(longitud: number = 100): string {
      return this.description.length > longitud? `${this.description.substring(0, longitud)}...`: this.description
    }
    

  }
