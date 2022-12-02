import React, {useState} from 'react';
import cardStyles from './Card.module.scss'

function Card({id, title, price, image, onPlus, onFav, favorited=false}) {
    const [isAdded, setIsAdded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onClickPlus = () => {
        setIsAdded(!isAdded)
        if(!isAdded) {
            onPlus({title, image, price})
        }
    }

    const onClickFav = () => {
        setIsFavorite(prevFav => !prevFav)
        onFav({id, title, image, price})

    }

    return (
        <div className={cardStyles.card}>
            <div className={cardStyles.fav} onClick={onClickFav}>
                <img src={isFavorite ? "/img/heart-like.svg" : "/img/heart-unlike.svg"} alt="Unlike"/>
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
}

export default Card;