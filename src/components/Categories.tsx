import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId} from '../redux/slices/filterSlice';
import {RootState} from '../redux/store';


const Categories = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector((state: RootState) => state.filter.categoryId)
    const categoriesForMap = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
    return (
        <div className="categories">
            <ul>
                {categoriesForMap.map((categoryName, i) => (
                    <li key={i}
                        className={categoryId === i ? 'active' : ''}
                        onClick={() => dispatch(setCategoryId(i))}
                    >{categoryName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;