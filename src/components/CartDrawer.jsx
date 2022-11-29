import React from 'react';

const CartDrawer = () => {
    return (
        <div style={{display: "none"}} className="overlay">
            <div className="drawer">
                <h2 className="cart-title">Корзина <img className="remove-btn" src="/img/delete.svg" alt="delete"/></h2>
                <div className="items">
                    <div className="cartItem">
                        <img className="cart__img" width={70} height={70} src="/img/shoes/image 1.jpg" alt="Sneakers"/>
                        <div className="cartItem__desc">
                            <p className="desc">Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 UAH</b>
                        </div>
                        <img className="remove-btn" src="/img/delete.svg" alt="delete"/>
                    </div>
                    <div className="cartItem">
                        <img className="cart__img" width={70} height={70} src="/img/shoes/image 1.jpg" alt="Sneakers"/>
                        <div className="cartItem__desc">
                            <p className="desc">Мужские Кроссовки Nike Air Max 270</p>
                            <b>12 999 UAH</b>
                        </div>
                        <img className="remove-btn" src="/img/delete.svg" alt="delete"/>
                    </div>
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
                    <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;