import React from 'react';


type CategoryProps = {
    onChangeCategoryId: (i: number) => void
    value:number
}

const Categories: React.FC<CategoryProps> = React.memo(({onChangeCategoryId,value}) => {
    const categoriesForMap = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',]
    return (
        <div className="categories">
            <ul>
                {categoriesForMap.map((categoryName, i) => (
                    <li key={i}
                        className={value === i ? 'active' : ''}
                        onClick={() => onChangeCategoryId(i)}
                    >{categoryName}</li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;