import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export const OrderDetailItem = ({item}) => {
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
            <td className="text-center">
                <img src={Object.keys(product.image[0]).map((key) => product.image[0][key]).join("")}
                    alt="img" className="product-img" />
            </td>
            <td>
                <div><span>{product.name}</span></div>
                <div>Size: <span>{item.size}</span></div>
            </td>
            <td className="text-center">
                <span>{item.product}</span>
            </td>
            <td className="text-center">
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
