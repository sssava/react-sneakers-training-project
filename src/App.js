import Header from "./components/Header.js";
import CartDrawer from "./components/CartDrawer/CartDrawer.js";
import axios from "axios";
import {Routes, Route} from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() =>{
        async function fetchData(){
            try {
                const [cartResp, favResp, itemsResp] = await Promise.all([
                    axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart"),
                    axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart"),
                    axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/items")
                ])
                setIsLoading(false)

                setCartItems(cartResp.data)
                setFavorites(favResp.data)
                setItems(itemsResp.data)
            }catch (error){
                alert("Ошибка при запросе данных")
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const onAddToCart = async (obj) => {
        try {
            if(cartItems.find((item) => Number(item.id) === Number(obj.id))){
                setCartItems(prevItems => prevItems.filter(item => Number(item.id) !== Number(obj.id)))
                await axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart/${obj.id}`)


            }else {
                setCartItems(prevCartItem => [...prevCartItem, obj])
                await axios.post("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart", obj);
            }
        }catch (error){
            alert("Не удалось добавить в корзину")
            console.error(error)
        }
    }

    const onRemoveFromCart = async (id) => {
        try{
            setCartItems((prev) => prev.filter(item => item.id !== id))
            await axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart/${id}`)
        }catch (error){
            alert("Ошибка удаления товара из корзины")
            console.error(error)
        }
    }

    const onAddToFavorites = async (obj) => {
        try {
            if(favorites.find((favObj) => favObj.id === obj.id)){
                await axios.delete(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/favorites/${obj.id}`)
                setFavorites(prevFav => prevFav.filter(item => item.id !== obj.id))
            }else {
                const {data} = await axios.post(`https://63875d2cd9b24b1be3ee3b8c.mockapi.io/favorites/`, obj)
                setFavorites(prevFav => [...prevFav, data])
            }
        } catch (error){
            alert("Не удалось добавить в избранное")
            console.error(error)
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id))
    }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorites, onAddToCart, setCartOpened, setCartItems}}>
        <div className="wrapper clear">
            <CartDrawer items={cartItems} onClickCart={() => {setCartOpened(!cartOpened)}} onRemove={onRemoveFromCart} opened={cartOpened} />
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
                <Route path="/orders" exact element={<Orders />}/>
            </Routes>
        </div>
    </AppContext.Provider>
  );
}

export default App;
