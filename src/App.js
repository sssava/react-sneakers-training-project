import Card from "./components/Card/Card.jsx";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import axios from "axios";
import React, {useEffect, useState} from "react";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() =>{
        axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/items").then((res) =>{
            setItems(res.data)
        })
        axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart").then((res) =>{
            setCartItems(res.data)
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

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

  return (
    <div className="wrapper clear">
        {cartOpened && <CartDrawer items={cartItems} onClickCart={() => {setCartOpened(!cartOpened)}} onRemove={onRemoveFromCart} />}
        <Header onClickCart={() => {setCartOpened(!cartOpened)}}/>
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
               {items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map(item => {
                   return(
                       <Card title={item.name}
                             price={item.price}
                             image={item.image}
                             onPlus={(obj) => onAddToCart(obj)}
                             key={item.id}/>
                   )
               })}
           </div>
        </div>
    </div>
  );
}

export default App;
