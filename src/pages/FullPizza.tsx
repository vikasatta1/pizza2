import React, {useEffect, useState} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import {ResponsePizzaType} from "../redux/slices/pizzaSlice";

type PizzaPropsType = {
    title: string
    price: number
    imageUrl: string
}
const FullPizza = () => {
    const navigate = useNavigate()
    const [pizza, setPizza] = useState<any>()
    const {id} = useParams()
    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {

                alert('ошибка при получении пиццы!')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])
    if (!pizza) {
        return <div className={'container'}><h1>Загрузка..</h1></div>
    } else {
        return (
            <div className={'container'}>
                <img width="300" src={pizza.imageUrl}/>
                <h2>{pizza.title}</h2>
                <h4>{pizza.price} P</h4>
            </div>
        );
    }

}

export default FullPizza;