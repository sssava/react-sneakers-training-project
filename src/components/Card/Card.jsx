import React, {useState} from 'react';
import cardStyles from './Card.module.scss'

const Card = ({title, price, image, onPlus}) => {
    const [isAdded, setIsAdded] = useState(false)

    const onClickPlus = () => {
        setIsAdded(!isAdded)
        if(!isAdded) {
            onPlus({title, image, price})
        }
    }

    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.fav}>
                <img src="/img/heart-unlike.svg" alt="Unlike"/>
            </div>
            <img width={133} height={112} src={image} alt="Sneakers"/>
            <h5>{title}</h5>
            <div>
                <div>
                    <span>Цена:</span>
                    <b>{price} UAH</b>
                </div>
                <img className={cardStyles.plus} width={30} height={30}
                     onClick={onClickPlus}
                     src={isAdded ? "/img/add-green.svg" : "/img/add.svg"} alt="Plus"/>
            </div>
        </div>
    );
};

export default Card;