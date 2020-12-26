import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

export const TransactionItem = ({item}) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            await Axios
                .get("http://localhost:5000/products/product/" + item.product)
                .then((res) => {
                    setProduct(res.data.message)
                })
                .catch((err) => { console.log(err) })
        }
        fetchData()
    }, [])

    if (product === null) {
        return <tr></tr>
    }
    return (
        <tr>
            <td className="">
                <Link to={"/collections/" + item.product} className="transactionId">
                    <img src={Object.keys(product.image[0]).map((key) => product.image[0][key]).join("")} />
                </Link>
            </td>
            <td className="text-left">
                <Link to={"/collections/" + item.product} className="transactionId">
                    <span>{product.name}</span>
                </Link>
                <span>Size: {item.size}</span>
            </td>
            <td className="text-center">
                <span>{item.product}</span>
            </td>
            <td className="text-right">
                <span>{item.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
            </td>
            <td className="text-center">
                <span>{item.quantity}</span>
            </td>
            <td className="text-right">
                <span>{(item.quantity*item.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
            </td>
        </tr>
    )
}
