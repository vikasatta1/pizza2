import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {SortType} from "./filterSlice";

enum Status {
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


const initialState: pizzaState = {
    items: [],
    status: Status.LOADING
}

export type SearchPizzaParams = {

    sortBy: string,//
    order: string, category: string, search: string, currentPage: number
}
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    })


export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.items = action.payload
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
            state.items = []
        });
    }
})

export const selectPizzaData = (state: RootState) => state.pizza


export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer