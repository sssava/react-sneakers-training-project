import React, {useEffect, useState} from 'react';
import Card from "../components/Card/Card";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)

    useEffect(() => {
        async function fetchOrders(){
            try {
                const orderResp = await axios.get("https://63875d2cd9b24b1be3ee3b8c.mockapi.io/orders")
                setOrders(orderResp.data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setLoadingOrders(false)
            }catch (error){
                alert("Не удалось загрузить заказы")
                console.error(error)
            }

        }
        fetchOrders()
    }, [])

    return (
        <div className="content">
            <div className="content-header">
                <h1>Мои заказы</h1>
            </div>

            <div className="sneakers">
                {(loadingOrders ? [...Array(4)] : orders).map((item, index) => {
                    return(
                        <Card loading={loadingOrders}
                              key={index}
                              {...item}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Orders;