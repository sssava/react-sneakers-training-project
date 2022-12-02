import Card from "./components/Card/Card.js";
import Header from "./components/Header.js";
import CartDrawer from "./components/CartDrawer.js";
import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const [cartOpened, setCartOpened] = useState(false)


    useEffect(() =>{
        axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/items").then((res) =>{
            setItems(res.data)
        })
        axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart").then((res) =>{
            setCartItems(res.data)
        })
        axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/favorites").then((res) =>{
            setFavorites(res.data)
        })
    }, [])

    const onAddToCart = (obj) => {
        axios.post("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart", obj);
        setCartItems(prevCartItem => [...prevCartItem, obj])
    }

    const onRemoveFromCart = (id) => {
        setCartItems((prev) => prev.filter(item => item.id !== id))
        axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart/${id}`)
    }

    const onAddToFavorites = async (obj) => {
        try {
            if(favorites.find((favObj) => favObj.id === obj.id)){
                axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/favorites/${obj.id}`)
                setFavorites(prevFav => prevFav.filter(item => item.id !== obj.id))
            }else {
                const {data} = await axios.post(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/favorites/`, obj)
                setFavorites(prevFav => [...prevFav, data])
            }
        } catch (error){
            alert("Не удалось добавить в избранное")
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

  return (
    <div className="wrapper clear">
        {cartOpened && <CartDrawer items={cartItems} onClickCart={() => {setCartOpened(!cartOpened)}} onRemove={onRemoveFromCart} />}
        <Header onClickCart={() => {setCartOpened(!cartOpened)}}/>
        <Routes>
            <Route path="/" element={<Home
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            items={items}
            onAddToCart={onAddToCart}
            onAddToFavorites={onAddToFavorites}
            setItems={setItems}
            setCartItems={setCartItems}
             />} />
            <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorites={onAddToFavorites}/>}/>
        </Routes>
    </div>
  );
}

export default App;
