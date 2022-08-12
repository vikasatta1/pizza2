
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {CartSliceState} from "./types";


const {items,totalPrice} = getCartFromLS()

const initialState:CartSliceState = {
    totalPrice,
    items,
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
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem: (state, action:PayloadAction<string>) => {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items);
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

// Action creators are generated for each case reducer function
export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions

export default cartSlice.reducer