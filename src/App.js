import Header from "./components/Header.js";
import CartDrawer from "./components/CartDrawer.js";
import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() =>{
        async function fetchData(){
            const cartResp = await axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart")
            const favResp = await axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/favorites")
            const itemsResp = await axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/items")
            setIsLoading(false)

            setCartItems(cartResp.data)
            setFavorites(favResp.data)
            setItems(itemsResp.data)

        }
        fetchData()
    }, [])

    const onAddToCart = (obj) => {
        if(cartItems.find((item) => Number(item.id) === Number(obj.id))){
            axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart/${obj.id}`)
            setCartItems(prevItems => prevItems.filter(item => Number(item.id) !== Number(obj.id)))


        }else {
            axios.post("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart", obj);
            setCartItems(prevCartItem => [...prevCartItem, obj])
        }
    }

    const onRemoveFromCart = (id) => {
        axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
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

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id))
    }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorites, setCartOpened, setCartItems}}>
        <div className="wrapper clear">
            {cartOpened && <CartDrawer items={cartItems} onClickCart={() => {setCartOpened(!cartOpened)}} onRemove={onRemoveFromCart} />}
            <Header onClickCart={() => {setCartOpened(!cartOpened)}}/>
            <Routes>
                <Route path="/" element={<Home
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    items={items}
                    cartItems={cartItems}
                    onAddToCart={onAddToCart}
                    onAddToFavorites={onAddToFavorites}
                    isLoading={isLoading}
                />} />
                <Route path="/favorites" element={<Favorites />}/>
            </Routes>
        </div>
    </AppContext.Provider>
  );
}

export default App;
