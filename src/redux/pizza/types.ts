export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type Pizza = {
    id: string
    title: string
    price: number
    imageUrl: string
    types: number[]
    sizes: number
    rating: number
}

export interface pizzaState {
    items: Pizza[]
    status: Status
}
export type SearchPizzaParams = {

    sortBy: string,//
    order: string, category: string, search: string, currentPage: number
}