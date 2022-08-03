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
export type sortValueType = {name:string,sortProperty:string}
const Home = () => {
    const fakePizza = [...new Array(10)]

    const [isLoading, setISLoading] = useState(false)
    const [pizza, setPizza] = useState<Array<ResponsePizzaType>>([])
    const [categoryId,setCategoryId] = useState(0)
    const [sortType, setSortType] = useState<sortValueType>({
        name:'популярности',
        sortProperty:'rating'
    })

const onClickCategory = (i:number) => {
    setCategoryId(i)
}


    useEffect(() => {
        setISLoading(true)
        fetch(`https://626d16545267c14d5677d9c2.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=desc`)
            .then((res) => res.json())
            .then((data) => setPizza(data))
            .finally(() => setISLoading(false))
        window.scrollTo(0, 0)
    }, [categoryId,sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onClickCategory}/>
                <Sort value={sortType} onChangeSort={(i:sortValueType)=>{setSortType(i)}}/>
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