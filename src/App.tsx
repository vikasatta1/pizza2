import React from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import Categories from "./components/Categories";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import pizza from './store/db.json'


function App() {
    //https://626d16545267c14d5677d9c2.mockapi.io/items
    fetch('https://626d16545267c14d5677d9c2.mockapi.io/items');
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
                        {pizza.map(pizza => (
                            < PizzaBlock {...pizza} key={pizza.id}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
