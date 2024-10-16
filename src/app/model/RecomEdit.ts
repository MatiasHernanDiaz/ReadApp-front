import { Book } from "./Book"


export class RecomEdit{
    creator: {id:number, fullName: string}
    title:string
    description:string
    publicIs: boolean
    id: number
    canRating: boolean
    canEdit: boolean
    books: Array<Book>
    
    constructor(
        title: string,
        description: string,
        publicIs: boolean,
        id: number,
        creator: {id:number, fullName: string},
        canRating: boolean,
        canEdit: boolean,
        books: Array<Book>
    ){
        this.creator = creator
        this.title = title
        this.description = description
        this.publicIs = publicIs
        this.id = id
        this.canRating = canRating
        this.canEdit = canEdit
        this.books = books
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
            recomendacionJSON.books
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
}

