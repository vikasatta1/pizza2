import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzaBlock from "../components/pizzaBlock/SkeletonPizzaBlock";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";

export type ResponsePizzaType = {
    category: number
    id: string
    imageUrl: string
    price: number
    rating: number
    sizes: Array<number>
    title: string
    types: Array<number>
}

const Home = () => {
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
        window.scrollTo(0, 0)
    }, [])

    return (
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
            </div>

        </div>
    );
};

export default Home;