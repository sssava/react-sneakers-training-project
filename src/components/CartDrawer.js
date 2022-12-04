import React, {useContext, useState} from 'react';
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) =>setTimeout(resolve, ms))

function CartDrawer({onClickCart, items = [], onRemove}) {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const {cartItems, setCartItems} = useContext(AppContext)

    const onClickOrder = async () =>{
        try{
            const {data} = await axios.post("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/orders", {items: cartItems})
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/cart/" + item.id)
                await delay(1000)
            }
        }catch (error){
            alert("Не удалось создать заказ")
        }
    }

    console.log(items)

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="cart-title">Корзина <img className="remove-btn" src="/img/delete.svg" onClick={onClickCart} alt="delete"/></h2>
                {items.length > 0 ?
                    <div className="cart__items">
                        <div className="items">
                            {items.map(item => (
                                <div key={item.id} className="cartItem">
                                    <img className="cart__img" width={70} height={70} src={item.image} alt="cart"/>
                                    <div className="cartItem__desc">
                                        <p className="desc">{item.title}</p>
                                        <b>{item.price}</b>
                                    </div>
                                    <img className="remove-btn" src="/img/delete.svg" onClick={() => onRemove(item.id)} alt="delete"/>
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 UAH</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 UAH</b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                        </div>
                    </div>:
                    <Info title={isOrderComplete ? "Заказ Оформлен" : "Корзина пустая"}
                          description={isOrderComplete? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                          image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} />

                }

            </div>
        </div>
    );
}

export default CartDrawer;