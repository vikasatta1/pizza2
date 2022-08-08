import {createSlice} from '@reduxjs/toolkit'


export interface CartState {

}

const initialState:any = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find((obj: { id: number }) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else{
                state.items.push({
                    ...action.payload,
                    count:1
                })
            }
            state.totalPrice = state.items.reduce((sum: any, obj: { price: any ,count:number})=>{
                return (obj.price * obj.count) + sum
            },0)
        },
        removeItem: (state, action) => {

            state.items = state.items.filter((obj: { id: number }) => obj.id !== action.payload)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        minusItem:(state, action)=>{
            const findItem = state.items.find((obj: { id: number }) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice -= findItem.price
        }
    },
})

// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions

export default cartSlice.reducer