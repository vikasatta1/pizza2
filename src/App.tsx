import React, {useEffect, useState} from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import SkeletonPizzaBlock from "./components/pizzaBlock/SkeletonPizzaBlock";


type ResponsePizzaType = {
    category: number
    id: string
    imageUrl: string
    price: number
    rating: number
    sizes: Array<number>
    title: string
    types: Array<number>
}


function App() {
    const fakePizza = [...new Array(10)]
    const [isLoading, setISLoading] = useState(false)
    const [pizza, setPizza] = useState<Array<ResponsePizzaType>>([])
    //https://626d16545267c14d5677d9c2.mockapi.io/items
    useEffect(() => {
        setISLoading(true)
        fetch('https://626d16545267c14d5677d9c2.mockapi.io/items')
            .then((res) => res.json())
            .then((data) => setPizza(data))
            .finally(() => setISLoading(false))
    }, [])


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {isLoading
                            ? fakePizza.map((_, i) => <SkeletonPizzaBlock key={i}/>)
                            : pizza.map(pizza => (
                                < PizzaBlock {...pizza} key={pizza.id}/>
                            ))}
                        {}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
