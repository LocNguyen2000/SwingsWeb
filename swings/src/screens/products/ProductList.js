import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Card } from "../card/Card"
import "../../css/productList.css"
import Axios from 'axios'

const category = ["ao", "quan", "balo-tui-xach", "giay-dep", "phu-kien", "sp-mua-dong", "balo"]

export const ProductList = (props) => {
    const [selectedOption, setSelectedOption] = useState("moi_nhat")
    const [productList, setProductList] = useState(null)
    const [product, setProduct] = useState(null)
    const { type, link } = props
    const sortList = (value) => {
        var val = product
        if (selectedOption === "gia_tang_dan") {
            val.sort((a, b) => b.price * (100 - b.discount) / 100 - a.price * (100 - a.discount) / 100)
            setProductList(val)
        } else if (selectedOption === "gia_giam_dan") {
            val.sort((a, b) => a.price * (100 - a.discount) / 100 - b.price * (100 - b.discount) / 100)
            setProductList(val)
        } else if (selectedOption === "ten_a_z") {
            val.sort((a, b) => b.name.trim().localeCompare(a.name.trim()))
            setProductList(val)
        } else if (selectedOption === "ten_z_a") {
            val.sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
            setProductList(val)
        } else if (selectedOption === "cu_nhat") {
            var index;
            var arr = []
            for (index = val.length - 1; index >= 0; index--) {
                arr.push(val[index])
            }
            setProductList(arr)
        } else {
            setProductList(product)
        }
        setSelectedOption(value)
    }

    useEffect(() => {
        const fetchData = async (cate) => {
            return Axios.get("http://localhost:5000/products/" + cate + "/" + link)
                .then((res) => {
                    var index;
                    var arr = []
                    for (index = res.data.message.length - 1; index >= 0; index--) {
                        arr.push(res.data.message[index])
                    }
                    setProductList(arr)
                    setProduct(arr)
                })
                .catch((err) => { console.log(err) })
        }
        const fecthAllData = async () => {
            return Axios.get("http://localhost:5000/products/allProduct")
                .then((res) => {
                    var data = res.data.message
                    var arr = []
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].discount === "50") {
                            arr.push(data[i])
                        }
                    }
                    setProductList(arr)
                    setProduct(arr)
                })
                .catch((err) => { console.log(err) })
        }
        if (category.find(item => item === link)) {
            fetchData("category")
        } else if (link === "sale-50") {
            fecthAllData()
        } else {
            fetchData("subCategory")
        }
    }, [])

    return (
        <div>
            <Row>
                <img className="carosel" src="http://theme.hstatic.net/200000201725/1000627199/14/slideshow_1.png?v=301" alt="Thời trang nam" />
            </Row>

            <Row>
                <Container className="productList_title">
                    <span className="title">{type}</span>
                    <div className="custom_drop">
                        <select className="custom_drop_select" onChange={e => sortList(e.target.value)}>
                            <option className="item" value="moi_nhat">Mới nhất</option>
                            <option className="item" value="cu_nhat">Cũ nhất</option>
                            <option className="item" value="gia_tang_dan">Giá: Tăng dần</option>
                            <option className="item" value="gia_giam_dan">Giá: Giảm dần</option>
                            <option className="item" value="ten_a_z">Tên: A-Z</option>
                            <option className="item" value="ten_z_a">Tên: Z-A</option>
                        </select>
                    </div>
                </Container>
            </Row>

            <Container>
                <Row>
                    {(productList !== null)
                        ? productList.map(item => <Card product={item} />)
                        : <div></div>
                    }
                </Row>
            </Container>
        </div>
    )
}
