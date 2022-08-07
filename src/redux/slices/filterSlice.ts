import { createSlice } from '@reduxjs/toolkit'


export interface CounterState {
    categoryId:number
    currentPage:number
    sort:{
        name:string
        sortProperty:string
    }
}

const initialState: CounterState = {
    categoryId:0,
    currentPage:1,
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
        },
        setCurrentPage:(state,action)=>{
            state.currentPage = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCategoryId,setSort,setCurrentPage } = filterSlice.actions

export default filterSlice.reducer