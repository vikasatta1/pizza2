import {SortPropertyEnum} from "./slice";

export type SortType = {
    name: string
    sortProperty: SortPropertyEnum
}
export interface FilterState {
    searchValue: string,
    categoryId: number
    currentPage: number
    sort: SortType
}