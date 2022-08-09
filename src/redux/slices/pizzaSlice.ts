import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export interface pizzaState {
    isLoading:'loading'| 'success'| 'error'
}

type paramsType = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    currentPage: number
}
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: paramsType) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    })

const initialState: any = {
    items: [],
    status:'loading'
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: {
        //@ts-ignore
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        }, //@ts-ignore
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        }, //@ts-ignore
        [fetchPizzas.rejected]: (state, ) => {
            state.status = 'error'
            state.items = []
        },

    },
})

// Action creators are generated for each case reducer function
export const {} = pizzaSlice.actions

export default pizzaSlice.reducer