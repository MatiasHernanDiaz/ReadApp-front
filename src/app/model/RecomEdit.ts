export class RecomEdit{
    creator: {id:number}
    title:string
    description:string
    publicIs: boolean
    id: number
    constructor(
        title: string,
        description: string,
        publicIs: boolean,
        id: number,
        creator: {id:number}
    ){
        this.creator = {id}
        this.title = title
        this.description = description
        this.publicIs = publicIs
        this.id = id
    }


    static fromRecomEditJSON(recomendacionJSON: JSONRecomEdit): RecomEdit {
        return new RecomEdit(
            recomendacionJSON.title,
            recomendacionJSON.description,
            recomendacionJSON.publicIs,
            recomendacionJSON.id,
            recomendacionJSON.creator
        )
      }
}

export type JSONRecomEdit = {
    creator: {id:number}
    title:string
    description:string
    publicIs: boolean
    id: number
}

