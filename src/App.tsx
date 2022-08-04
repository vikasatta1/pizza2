import React, { useState,ChangeEvent } from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";


function App() {
    const [searchValue,setSearchValue] = useState('')


    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                    <Routes>
                        <Route path={''} element={<Home searchValue={searchValue}/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>

                        <Route path={'*'} element={<NotFoundBlock/>}/> {/* если ничего не нашел*/}
                    </Routes>

            </div>
        </div>
    );
}

export default App;
