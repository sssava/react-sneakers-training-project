import React, {useState} from 'react';
import Info from "../Info";
import axios from "axios";
import {useCart} from "../../hooks/useCart";

import styles from './CartDrawer.module.scss'


const delay = (ms) => new Promise((resolve) =>setTimeout(resolve, ms))

function CartDrawer({onClickCart, items = [], onRemove, opened}) {
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const {cartItems, setCartItems, total} = useCart()

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
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
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
                                    <b>{total}UAH</b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>{total / 100 * 5} UAH</b>
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