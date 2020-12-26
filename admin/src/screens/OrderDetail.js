import React, { useEffect, useState } from 'react'
import "../css/orderdetail.css"
import { Table } from "react-bootstrap";
import { OrderDetailItem } from './OrderDetailItem';
import Axios from 'axios';

export const OrderDetail = ({match}) => {
    // console.log(match.params.id)
    const [transaction, setTransaction] = useState(null)

    const fetchTransactions = async () => {
        return await Axios
            .get("http://localhost:5000/order/getOrder/" + match.params.id)
            .then((res) => { 
                setTransaction(res.data.message)
                // console.log(res.data.message) 
            })
            .catch((err) => { console.log(err) })
    }
    useEffect(() => {
        fetchTransactions()
    },[])
    if (transaction === null) {
        return <div></div>
    }

    return (
        <div className="order-detail">
            <div className="detail-header">Đơn hàng <span>#{match.params.id}</span></div>
            <div className="user-info">
                <h3>{transaction.name}</h3>
                <div>
                    <span>{transaction.email}</span>
                </div>
                <div>
                    <span>{transaction.phone}</span>
                </div>
                <div>
                    <span>{transaction.address}</span>
                </div>
            </div>
            <div>
                <Table className="table-data" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sản phẩm</th>
                            <th className="text-center">Mã sản phẩm</th>
                            <th className="text-center">Đơn giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {products !== null
                        ? products.map(item => <RenderProduct product={item} setProducts={setProducts} setId={setId} products={products} />)
                        : <tr></tr>
                    } */}
                        {
                            transaction.order.map((item) => <OrderDetailItem item={item}/>)
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-right">
                                <span>Tổng tiền</span>
                            </td>
                            <td className="text-right">
                                <span>{transaction.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
