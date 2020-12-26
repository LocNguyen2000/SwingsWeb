
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Card } from "../card/Card"
import Axios from 'axios'

export const Homapage = () => {
    const [products, setProducts] = useState(null)
    const [newArrival, setNewArrival] = useState(null)
    const [sale, setSale] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        Axios
            .get("http://localhost:5000/products/allProduct")
            .then((res) => {
                var index;
                var arr = []
                for (index = res.data.message.length - 1; index >= 0; index--) {
                    arr.push(res.data.message[index])
                }
                setProducts(arr.message)
                var newArr = []
                var saleArr = []
                for (var i = res.data.message.length - 1; i > res.data.message.length - 9; i--) {
                    newArr.push(res.data.message[i])
                }
                setNewArrival(newArr)
                var index = 0
                for (var i = 0; i < arr.length; i++) {
                    if (index === 8) {
                        break
                    }
                    if (arr[i].discount === "50") {
                        saleArr.push(arr[i])
                        index += 1
                    }
                }
                setSale(saleArr)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (newArrival === null) {
        return (<div></div>)
    }
    if (sale === null) {
        return (<div></div>)
    }

    return (
        <div>
            <Row>
                <img className="carosel" src="http://theme.hstatic.net/200000201725/1000627199/14/slideshow_1.png?v=301" alt="Thời trang nam" />
            </Row>

            <Row className="titl">
                <a href="/">NEW ARRIVAL</a>
            </Row>

            <Container>
                <Row>
                    {
                        newArrival.map((item) => <Card product={item} />)
                    }
                </Row>
            </Container>

            <Row className="titl">
                <a href="/collections/sale-50">SALE UP TO 50%</a>
            </Row>

            <Container>
                <Row>
                    {
                        sale.map((item) => <Card product={item} />)
                    }
                </Row>
            </Container>
        </div>
    )
}
