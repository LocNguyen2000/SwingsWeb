import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../css/user.css";
import Axios from 'axios'

const RenderOrder = (props) => {
    const { order } = props
    function formatDate(dateStr, format) {
        var date = new Date(Date.parse(dateStr))
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }

        return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
    }

    const updateState = async () => {
        return await Axios
            .put("http://localhost:5000/order/updateOrder/" + order._id)
            .then((res) => {
                // console.log(res)
            })
            .catch((err) => { console.log(err) })
    }

    const handleChangeState = (e) => {
        if (e.target.value === "Delivered") {
            updateState(true)
        }
    }

    return (
        <tr>
            <td>
                <a href={"/homepage/orders/" + order._id} className="link">#{order._id}</a>
            </td>
            <td>
                {
                    order.username === "Khách hàng" 
                    ? order.username :
                    <a href={"/homepage/users/" + order.username} className="link">{order.username}</a>
                }
            </td>
            <td>{order.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</td>
            <td>{formatDate(order.orderDate, 'dd/mm/yy')}</td>
            <td>
                <select onChange={handleChangeState} defaultValue={order.isOrderCompleted ? "Delivered" : "Processing"} disabled={order.isOrderCompleted}>
                    <option value="Delivered">Delivered</option>
                    <option value="Processing">Processing</option>
                </select>
            </td>
        </tr>
    );
};

export const Order = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            return await Axios
                .get("http://localhost:5000/order/allOrder")
                .then((res) => {
                    var index;
                    var arr = []
                    for (index = res.data.message.length - 1; index >= 0; index--) {
                        arr.push(res.data.message[index])
                    }
                    setOrders(arr);
                })
                .catch((err) => { console.log(err) })
        }
        fetchTransactions()
    }, [])

    if (orders === null) {
        return (<div></div>)
    }

    return (
        <div className="order">
            <h1>Lịch sử mua hàng</h1>
            <Table className="table-data" striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Usename</th>
                        <th>Price</th>
                        <th>Order Date</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(item => {
                            if (!item.isOrderCompleted)
                                return <RenderOrder order={item} />
                        })
                    }
                    {
                        orders.map(item => {
                            if (item.isOrderCompleted)
                                return <RenderOrder order={item} />
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}
