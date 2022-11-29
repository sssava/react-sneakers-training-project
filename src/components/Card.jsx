import React from 'react';

const Card = () => {
    return (
        <div className="card">
            <div className="fav">
                <img src="/img/heart-unlike.svg" alt="Unlike"/>
            </div>
            <img width={133} height={112} src="/img/shoes/image 1.jpg" alt="Sneakers"/>
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div>
                <div>
                    <span>Цена:</span>
                    <b>12.999 UAH</b>
                </div>
                <button className="button">
                    <img width={11} height={11} src="/img/add.svg" alt="Plus"/>
                </button>
            </div>
        </div>
    );
};

export default Card;