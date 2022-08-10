import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectFilter, setCategoryId} from '../redux/slices/filterSlice';


const Categories:React.FC = () => {
    const dispatch = useDispatch()
    const {categoryId} = useSelector(selectFilter)
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