import React, {useState} from 'react';

const Categories = () => {
    const [categories,setCategories] = useState<string>('')

    const categoriesForMap = [
        {name:'Все'},
        {name:'Мясные'},
        {name:'Вегетарианская'},
        {name:'Гриль'},
        {name:'Острые'},
        {name:'Закрытые'},
    ]
    return (
        <div className="categories">
            <ul>
                {categoriesForMap.map(c => (
                    <li className={categories === c.name ? 'active' : '' } onClick={()=>setCategories(c.name)} key={c.name}>{c.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;