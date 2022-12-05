import React, {useContext} from 'react';
import Card from "../components/Card/Card";
import AppContext from "../context";

function Favorites() {
    const {favorites, onAddToFavorites} = useContext(AppContext)

    return (
        <div className="content">
            <div className="content-header">
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers">
                {favorites.map(item => {
                    return(
                        <Card {...item}
                              favorited={true}
                              onFav={onAddToFavorites}
                              key={item.id}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Favorites;