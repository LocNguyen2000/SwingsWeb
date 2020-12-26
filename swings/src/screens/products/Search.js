import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import "../../css/search.css"
import { Card } from '../card/Card'
import Axios from 'axios'

export const Search = ({ location }) => {
    const [product, setProduct] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            return Axios.get("http://localhost:5000/products/:name?searchKeyword=" + location.search.split("=")[1])
                .then((res) => {
                    var index;
                    var arr = []
                    for (index = res.data.message.length - 1; index >= 0; index--) {
                        arr.push(res.data.message[index])
                    }
                    setProduct(arr)
                })
                .catch((err) => { console.log(err) })
        }
        fetchData()
    }, [])
    return (
        <Container>
            <Row className="wrap-heading">
                <div className="heading-page">
                    <h3>Tìm kiếm</h3>
                    <p>Có {product !== null ? product.length : "0"} sản phẩm cho tìm kiếm</p>
                </div>
            </Row>
            <Row>
                <p>Kết quả tìm kiếm cho {location.search.split("=")[1]}</p>
            </Row>
            <Row>
                {(product !== null)
                    ? product.map(item => <Card product={item} />)
                    : <div></div>
                }
            </Row>
        </Container>
    )
}
