import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    categoryId:number
    sort:{
        name:string
        sortProperty:string
    }
}

const initialState: CounterState = {
    categoryId:0,
    sort:{
        name:'популярности',
        sortProperty:'rating',
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId:(state,action)=>{
            state.categoryId = action.payload
        },
        setSort:(state,action)=>{
            state.sort = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCategoryId,setSort } = filterSlice.actions

export default filterSlice.reducer