import React from 'react';
type CategoriesType ={
    value:number
    onChangeCategory:(i:number)=>void
}

const Categories = ({value,onChangeCategory}:CategoriesType) => {


    const categoriesForMap = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
    return (
        <div className="categories">
            <ul>
                {categoriesForMap.map((categoryName,i) => (
                    <li key={i}
                        className={value === i ? 'active' : '' }
                        onClick={()=>onChangeCategory(i)}
                    >{categoryName}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;