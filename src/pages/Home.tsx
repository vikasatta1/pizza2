import React, {useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzaBlock from "../components/pizzaBlock/SkeletonPizzaBlock";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from '../components/Pagination/Pagination';
import {SearchContext} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import axios from "axios";
import {setCurrentPage} from "../redux/slices/filterSlice";

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
    const dispatch = useDispatch()
    //useSelectors
    const {sort, categoryId, currentPage} = useSelector((state: RootState) => state.filter)
    const sortType = sort.sortProperty


//@ts-ignore
    const {searchValue} = React.useContext(SearchContext)
    const fakePizza = [...new Array(10)]

    //useState
    const [isLoading, setISLoading] = useState<boolean>(false)
    /*const [currentPage, setCurrentPage] = useState(1)*/
    const [pizza, setPizza] = useState<Array<ResponsePizzaType>>([])


    const pizzas = pizza.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map(pizza => (< PizzaBlock {...pizza} key={pizza.id}/>))

    const fakeMapPizzas = fakePizza.map((_, i) => <SkeletonPizzaBlock key={i}/>)
    const onChangePagination = (num: any) => dispatch(setCurrentPage(num))
    useEffect(() => {
        setISLoading(true)

        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        axios.get(`https://626d16545267c14d5677d9c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => setPizza(res.data))
            .finally(() => setISLoading(false))
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? fakeMapPizzas : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePagination}/>
        </div>
    );
};

export default Home;