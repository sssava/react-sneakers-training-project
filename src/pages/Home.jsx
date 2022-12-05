import React from 'react';
import Card from "../components/Card/Card.js";


function Home({items, onChangeSearchInput, searchValue, setSearchValue, onAddToFavorites, onAddToCart, isLoading}) {

    const renderItems = () =>{
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(9)] : filteredItems).map((item, index) => (
            <Card
                  onPlus={(obj) => onAddToCart(obj)}
                  onFav={(obj) => onAddToFavorites(obj)}
                  loading={isLoading}
                  key={index}
                  {...item} />
        ))
    }


    return (
        <div className="content">
            <div className="content-header">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue && <img className="clear remove-btn" onClick={() => setSearchValue('')} src="/img/delete.svg" alt="delete"/>}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск"/>
                </div>
            </div>

            <div className="sneakers">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;