import React, {useContext, useState} from 'react';
import ContentLoader from "react-content-loader"
import cardStyles from './Card.module.scss'
import AppContext from "../../context";

function Card({id, title, price, image, onPlus, onFav, favorited=false, added=false, loading=false}) {
    const [isFavorite, setIsFavorite] = useState(favorited)
    const { isItemAdded } = useContext(AppContext)

    console.log(title, isItemAdded(id))

    const onClickPlus = () => {
        onPlus({id, title, image, price})
    }

    const onClickFav = () => {
        setIsFavorite(prevFav => !prevFav)
        onFav({id, title, image, price})

    }

    return (
        <div className={cardStyles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={207}
                    viewBox="0 0 150 207"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="110" />
                    <rect x="0" y="120" rx="5" ry="5" width="150" height="15" />
                    <rect x="0" y="141" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="175" rx="5" ry="5" width="80" height="25" />
                    <rect x="116" y="172" rx="10" ry="10" width="32" height="32" />
                </ContentLoader> :
                    <>
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
                                 src={isItemAdded(id) ? "/img/add-green.svg" : "/img/add.svg"} alt="Plus"/>
                        </div>
                    </>
            }
        </div>
    );
}

export default Card;