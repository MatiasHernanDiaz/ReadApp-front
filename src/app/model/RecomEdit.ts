import { Book } from "./Book"
import { RatingWithId } from "./rating"


export class RecomEdit{
    creator: {id:number, fullName: string}
    title:string
    description:string
    publicIs: boolean
    id: number
    canRating: boolean
    canEdit: boolean
    books: Array<Book>
    ratings: Array<RatingWithId>
    
    constructor(
        title: string,
        description: string,
        publicIs: boolean,
        id: number,
        creator: {id:number, fullName: string},
        canRating: boolean,
        canEdit: boolean,
        books: Array<Book>,
        ratings: Array<RatingWithId>
    ){
        this.creator = creator
        this.title = title
        this.description = description
        this.publicIs = publicIs
        this.id = id
        this.canRating = canRating
        this.canEdit = canEdit
        this.books = books
        this.ratings = ratings
    }


    static fromRecomEditJSON(recomendacionJSON: JSONRecomEdit): RecomEdit {
        return new RecomEdit(
            recomendacionJSON.title,
            recomendacionJSON.description,
            recomendacionJSON.publicIs,
            recomendacionJSON.id,
            recomendacionJSON.creator,
            recomendacionJSON.canRating,
            recomendacionJSON.canEdit,
            recomendacionJSON.books,
            recomendacionJSON.ratings
        )
    }
}

export type JSONRecomEdit = {
    creator: {id:number, fullName: string}
    title:string
    description:string
    publicIs: boolean
    id: number
    canRating: boolean
    canEdit: boolean
    books: Array<Book>
    ratings: Array<RatingWithId>
}

