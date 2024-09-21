export type RecommendationJSON = {
    id: number;
    title: string;
    description: string;
    rating: number;
    books_count: number;
    time_to_read: string;
    comments: string[];
  };
  
  export class Recommendation {
    constructor(
      public id: number,
      public title: string,
      public description: string,
      public rating: number,
      public books_count: number,
      public time_to_read: string,
      public comments: string[]
    ) {}
  
    static fromRecomendacionJSON(recomendacionJSON: RecommendationJSON): Recommendation {
      return new Recommendation(
        recomendacionJSON.id,
        recomendacionJSON.title,
        recomendacionJSON.description,
        recomendacionJSON.rating,
        recomendacionJSON.books_count,
        recomendacionJSON.time_to_read,
        recomendacionJSON.comments
      )
    }
  
    obtenerRatingConFormato(): string {
      return `${this.rating} estrellas`
    }
  
    obtenerDescripcionCorta(longitud: number = 100): string {
      return this.description.length > longitud? `${this.description.substring(0, longitud)}...`: this.description
    }
  }
  