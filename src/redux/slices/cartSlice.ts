import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
export type CartItem = {
    id:string
    title:string
    price:number
    imageUrl:string
    type:string
    size:number
    count:number
}

export interface CartState {
    totalPrice:number
    items:Array<CartItem>
}

const initialState:CartState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else{
                state.items.push({
                    ...action.payload,
                    count:1
                })
            }
            state.totalPrice = state.items.reduce((sum: any, obj:any)=>{
                return (obj.price * obj.count) + sum
            },0)
        },
        removeItem: (state, action:PayloadAction<string>) => {
          state.items = state.items.filter((obj) => obj.id !== action.payload)
            //пофиксить чтоб при удалении пиццы из корзины уменьшалась общая стоимость
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        minusItem:(state, action:PayloadAction<string>)=>{
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
                state.totalPrice -= findItem.price
            }

        }
    },
})
export const selectCart = (state:RootState)=>state.cart
export const selectCartItemById = (id:string)=> (state:RootState) => state.cart.items.find((obj: { id: string; })=>obj.id === id)
// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions

export default cartSlice.reducer