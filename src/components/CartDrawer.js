import React from 'react';

function CartDrawer({onClickCart, items = [], onRemove}) {

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="cart-title">Корзина <img className="remove-btn" src="/img/delete.svg" onClick={onClickCart} alt="delete"/></h2>
                {items.length > 0 ?
                    <div>
                        <div className="items">
                            {items.map(item => {
                                return(
                                    <div className="cartItem">
                                        <img className="cart__img" width={70} height={70} src={item.image} alt="cart"/>
                                        <div className="cartItem__desc">
                                            <p className="desc">{item.title}</p>
                                            <b>{item.price}</b>
                                        </div>
                                        <img className="remove-btn" src="/img/delete.svg" onClick={() => onRemove(item.id)} alt="delete"/>
                                    </div>
                                )
                            })}
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
                    </div>:
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty"/>
                        <h2>Корзина пустая</h2>
                        <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <button onClick={onClickCart} className="greenButton">
                            <img src="/img/arrow.svg" alt="Arrow"/>
                            Вернуться назад
                        </button>
                    </div>

                }

            </div>
        </div>
    );
}

export default CartDrawer;