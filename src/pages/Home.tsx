import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzaBlock from "../components/pizzaBlock/SkeletonPizzaBlock";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

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

export type sortValueType = { name: string, sortProperty: string }
const Home = () => {
//@ts-ignore
    const {searchValue} = React.useContext(SearchContext)
    const fakePizza = [...new Array(10)]
    const [isLoading, setISLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pizza, setPizza] = useState<Array<ResponsePizzaType>>([])
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState<sortValueType>({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const pizzas = pizza.filter(obj=>{
        if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
            return true
        }
       return  false

    }).map(pizza => (
        < PizzaBlock {...pizza} key={pizza.id}/>
    ))

    const fakeMapPizzas = fakePizza.map((_, i) => <SkeletonPizzaBlock key={i}/>)

    const onClickCategory = (i: number) => {
        setCategoryId(i)
    }
    useEffect(() => {
        setISLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '');
        const category =  categoryId > 0 ? `category=${categoryId}` : '';
        const search =  searchValue  ? `&search=${searchValue}` : '';
        fetch(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((data) => setPizza(data))
            .finally(() => setISLoading(false))
        window.scrollTo(0, 0)
    }, [categoryId, sortType,searchValue,currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onClickCategory}/>
                <Sort value={sortType} onChangeSort={(i: sortValueType) => {
                    setSortType(i)
                }}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? fakeMapPizzas : pizzas}
            </div>
            <Pagination onChangePage={(num:any)=>setCurrentPage(num)}/>
        </div>
    );
};

export default Home;