import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, SearchPizzaParams} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    })
