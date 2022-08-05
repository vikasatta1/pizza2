import React, { useState,ChangeEvent } from 'react';
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";

//@ts-ignore

export const SearchContext = React.createContext();

function App() {
    const [searchValue,setSearchValue] = useState('')


    return (
        <div className="wrapper">
           < SearchContext.Provider value={{searchValue,setSearchValue}}>
            <Header />
            <div className="content">
                    <Routes>
                        <Route path={''} element={<Home/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>

                        <Route path={'*'} element={<NotFoundBlock/>}/> {/* если ничего не нашел*/}
                    </Routes>

            </div>
           </SearchContext.Provider>
        </div>
    );
}

export default App;
