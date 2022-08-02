import React, {useState} from 'react';
import Bottom from "./Bottom";


type PizzaCardPropsType = {
    name: string,
    price: number
    imageUrl: string
    sizes: Array<number>
    types: Array<number>
}

const PizzaBlock = ({name, price, imageUrl, sizes, types}: PizzaCardPropsType) => {
    const typesName = ["тонкое", "традиционное"]
    const [size, setSize] = useState<number>(0)
    const [dough, setDough] = useState<string>('')
    const [pizzaCount, setPizzaCount] = useState<number>(0)
    const countPlus = () => {
        setPizzaCount(pizzaCount + 1)
    }


    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {
                        types.map(t => (
                            <li key={t} className={dough === typesName[t] ? 'active' : ''}
                                onClick={() => setDough(typesName[t])}>{typesName[t]}</li>
                        ))
                    }
                </ul>
                <ul>
                    {sizes.map(s => (
                        <li key={s} className={size === s ? 'active' : ''}
                            onClick={() => setSize(s)}>{s} см.</li>
                    ))}

                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} руб.</div>
                <Bottom countPlus={countPlus} count={pizzaCount}/>
            </div>
        </div>
    );
};

export default PizzaBlock;