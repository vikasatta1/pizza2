import React, {useState} from 'react';
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartItemById} from "../../redux/slices/cartSlice";


type PizzaCardPropsType = {
    id:number,
    title: string,
    price: number
    imageUrl: string
    sizes: Array<number>
    types: Array<number>
}
const typesName = ["тонкое", "традиционное"]

const PizzaBlock = ({id,title, price, imageUrl, sizes, types}: PizzaCardPropsType) => {
    const dispatch = useDispatch()
    const cartItem = useSelector(selectCartItemById(id))
    const [activeSize, setActiveSize] = useState<number>(0)
    const [activeType, setActiveType] = useState<number>(0)
    const [pizzaCount, setPizzaCount] = useState<number>(0)

    const addedCount = cartItem ? cartItem.count : 0
    const countPlus = () => {
        setPizzaCount(pizzaCount + 1)
    }
    const onClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: typesName[activeType],
            size: sizes[activeSize],
        }
        dispatch(addItem(item))
    }


    return (
        <div className={'pizza-block-wrapper'}>
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            types.map((t) => (
                                <li key={t} className={activeType === t ? 'active' : ''}
                                    onClick={() => setActiveType(t)}>{typesName[t]}</li>
                            ))
                        }
                    </ul>
                    <ul>
                        {sizes.map((sizes,i) => (
                            <li
                                key={sizes}
                                onClick={() => setActiveSize(i)}
                                className={activeSize === i ? 'active' : ''}
                                >{sizes} см.</li>
                        ))}

                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} руб.</div>
                    <Button countPlus={countPlus} countC={pizzaCount} onClickAddItem={onClickAdd} addedCount={addedCount}/>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;