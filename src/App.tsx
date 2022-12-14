import './scss/app.scss'
import Home from "./pages/Home";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";



function App() {
    return (
        <Routes>
          <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>}/>
                <Route path={'cart'} element={<Cart/>}/>
                <Route path={'pizza/:id'} element={<FullPizza/>}/>
                <Route path={'*'} element={<NotFoundBlock/>}/> {/* если ничего не нашел*/}
          </Route>

        </Routes>
       /* <div className="wrapper">
    <Header />
    <div className="content">
        <Routes>
            <Route path={''} element={<Home/>}/>
            <Route path={'/cart'} element={<Cart/>}/>
            <Route path={'/pizza/:id'} element={<FullPizza/>}/>
            <Route path={'*'} element={<NotFoundBlock/>}/> {/!* если ничего не нашел*!/}
        </Routes>
    </div>
</div>*/

    );
}


/*<div className="wrapper">
    <Header />
    <div className="content">
        <Routes>
            <Route path={''} element={<Home/>}/>
            <Route path={'/cart'} element={<Cart/>}/>
            <Route path={'/pizza/:id'} element={<FullPizza/>}/>
            <Route path={'*'} element={<NotFoundBlock/>}/> {/!* если ничего не нашел*!/}
        </Routes>
    </div>
</div>*/
export default App;
