import React, {useCallback, useEffect, useRef} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import SkeletonPizzaBlock from "../components/pizzaBlock/SkeletonPizzaBlock";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Pagination from '../components/Pagination/Pagination';
import {useSelector} from 'react-redux';

import {useNavigate} from "react-router-dom";


import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selector";
import {selectPizzaData} from "../redux/pizza/selector";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {fetchPizzas} from "../redux/pizza/asyncActions";



const Home: React.FC = () => {
        const dispatch = useAppDispatch()
        const navigate = useNavigate()
        const isSearch = useRef(false)
        const isMounted = useRef(false)
        //useSelectors
        const {sort, categoryId, currentPage, searchValue} = useSelector(selectFilter)
        const {items, status} = useSelector(selectPizzaData)

        const sortType = sort.sortProperty

        const fakePizza = [...new Array(10)]

        const pizzas = items.filter(obj => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            }
            return false
            // @ts-ignore
        }).map(pizza => (< PizzaBlock {...pizza} key={pizza.id}/>))

        const fakeMapPizzas = fakePizza.map((_, i) => <SkeletonPizzaBlock key={i}/>)

        const onChangePagination = (num: number) => dispatch(setCurrentPage(num))
        const onChangeCategoryId = useCallback((idx: number) => dispatch(setCategoryId(idx)),[])
        const getPizzas = async () => {
            const sortBy = sortType.replace('-', '');
            const order = sortType.includes('-') ? 'asc' : 'desc'
            const category = categoryId > 0 ? `category=${categoryId}` : '';
            const search = searchValue ? `&search=${searchValue}` : '';

            dispatch(fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage
            }))
            window.scrollTo(0, 0)
        }
        //useEffects парсим при первом рендере
        /*      useEffect(() => {
                  if (window.location.search) {
                      const params = qs.parse(window.location.search.substring(1))
                      const sort = sortList.find(obj => obj.sortProperty === params.sortBy)//sortProperty
                      dispatch(setFilters({
                              ...params,
                              sort
                          }),
                      );
                      isSearch.current = true
                  }
              }, [])
              //если изменили параметры и был первый рендер
              useEffect(() => {
                  if (isMounted.current) {
                      const queryString = qs.stringify({
                          sortProperty: sort.sortProperty,
                          categoryId,
                          currentPage,
                      })
                      navigate(`?${queryString}`)
                  }
                  isMounted.current = true
              }, [categoryId, sortType, currentPage,searchValue])*/


        //если был первый рендер, то запрашиваем пиццы
        useEffect(() => {
            window.scrollTo(0, 0)
            if (!isSearch.current) {
                getPizzas()
            }

            isSearch.current = false

        }, [categoryId, sortType, searchValue, currentPage])


        return (
            <div className="container">
                <div className="content__top">
                    <Categories onChangeCategoryId={onChangeCategoryId} value={categoryId}/>
                    <Sort value={sort}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {
                    status == "error"
                        ? <div className={'content__error-info'}>
                            <h2>Произошла ошибка</h2>
                            <p>
                                К сожалению, не удалось получить пиццы.
                                Попробуйте повторить попытку позже
                            </p>
                        </div>
                        : (<div className="content__items">
                            {status === 'loading' ? fakeMapPizzas : pizzas}
                        </div>)
                }
                <Pagination currentPage={currentPage} onChangePage={onChangePagination}/>
            </div>
        );
    }
;

export default Home;