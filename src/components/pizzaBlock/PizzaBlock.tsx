import React, {useState} from 'react';
import Button from "../Button";
import { useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {CartItem} from "../../redux/cart/types";
import {selectCartItemById} from "../../redux/cart/selectors";
import {addItem} from "../../redux/cart/slice";


type PizzaCardPropsType = {
    id: string,
    title: string,
    price: number
    imageUrl: string
    sizes: Array<number>
    types: Array<number>
    rating:number
}
const typesName = ["тонкое", "традиционное"]

const PizzaBlock: React.FC<PizzaCardPropsType> = ({id, title, price, imageUrl, sizes, types, rating}) => {
    const dispatch = useAppDispatch()
    const cartItem = useSelector(selectCartItemById(id))
    const [activeSize, setActiveSize] = useState<number>(0)
    const [activeType, setActiveType] = useState<number>(0)


    const addedCount = cartItem ? cartItem.count : 0

    const onClickAdd = () => {
        const item:CartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typesName[activeType],
            size: sizes[activeSize],
            count:0
        }
        dispatch(addItem(item))
    }


    return (
        <div className={'pizza-block-wrapper'}>
            <div className="pizza-block">
                <Link to={`pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />

                <h4 className="pizza-block__title">{title}</h4>
                </Link>
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
                        {sizes.map((sizes, i) => (
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
                    <Button  onClickAddItem={onClickAdd} addedCount={addedCount}/>
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;