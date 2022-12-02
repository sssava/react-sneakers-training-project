import React from 'react';
import Card from "../components/Card/Card";

function Favorites({items, onAddToFavorites}) {
    return (
        <div className="content">
            <div className="content-header">
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers">
                {items.map(item => {
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