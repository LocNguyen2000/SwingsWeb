import React, { useState, useEffect, useContext } from 'react';
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import "../../css/productInfo.css"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'
import { AuthUserCtx } from '../../context/authUser';

const hdList = [
    { type: "ÁO THUN", img: "//file.hstatic.net/200000201725/file/ao_thun_092f3b2909a54d498928f18b6e1ea020_master.jpg" },
    { type: "ÁO SƠ MI", img: "//file.hstatic.net/200000201725/file/ao_somi_53d4d8a813904c4ea0686f3112c2f571_master.jpg" },
    { type: "ÁO POLO", img: "//file.hstatic.net/200000201725/file/ao_polo_cc8a36ef7ded4d0a9cc080ad75f56556_master.jpg" },
    { type: "ÁO KHOÁC", img: "//file.hstatic.net/200000201725/file/ao_khoac_056e1d3c31dd46208f81c0f2698b7d3b_master.jpg" },
    { type: "ÁO NỈ - SWEATSHIRT", img: "//file.hstatic.net/200000201725/file/ao_ni-sweatshirt_7a2ac041da264380a6ca6642d6df3d45_master.jpg" },
    { type: "ÁO TANKTOP", img: "//file.hstatic.net/200000201725/file/ao_tanktop_10a2265e7a624738aee21eb2a0796ff7_master.jpg" },
    { type: "ÁO LEN - SWEATER", img: "//file.hstatic.net/200000201725/file/ao_len-sweater_4b18e3e960ec4f93a8472a274d220362_master.jpg" },
    { type: "ÁO HOODIE", img: "//file.hstatic.net/200000201725/file/ao_hoodie_c751bc01aba14e63b3f90f2e8729109b_master.jpg" },
    { type: "QUẦN SHORT", img: "//file.hstatic.net/200000201725/file/quan_short_42fe0b5e9a4745d5af9ff1137e64606a_master.jpg" },
    { type: "QUẦN TÂY", img: "//file.hstatic.net/200000201725/file/quan_tay_e4307d69ebb84c6fb309fefa1f3b0d3d_master.jpg" },
    { type: "QUẦN KAKI", img: "//file.hstatic.net/200000201725/file/quan_kaki_e19d5342af55404da78775c61d07cead_master.jpg" },
    { type: "QUẦN JEANS", img: "//file.hstatic.net/200000201725/file/quan_jean_2d06b93170cf48aeba5bbf3f37592a5a_master.jpg" },
    { type: "QUẦN JOGGER - QUẦN DÀI", img: "//file.hstatic.net/200000201725/file/quan_jogger_06eae128a000431496275e8c6ce709ea_master.jpg" },
]

const countStar = (rating) => {
    var count = 0
    if (rating.length === 0) {
        return 0;
    }
    var x
    for (x in rating) {
        count += rating[x].score
    }
    return parseInt(count / rating.length);
}

export const ProductInfo = ({ match }) => {
    const { authUser } = useContext(AuthUserCtx)
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null);
    const [img, setImg] = useState(hdList[0].img)
    const [star, setStar] = useState(0);
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await Axios
                .get("http://localhost:5000/products/product/" + match.params.productId)
                .then((res) => {
                    setProduct(res.data.message)
                    setSize(res.data.message.size[0].toLowerCase())
                    setStar(countStar(res.data.message.rating))
                })
                .catch((err) => { console.log(err) })
        }
        fetchData()
    }, [])

    const changeSize = (e) => {
        document.getElementsByClassName("sd")[0].className = "";
        let target = e.target.nextSibling
        target.className += "sd";
        setSize(target.innerText.toLowerCase())
    }

    useEffect(() => {
        if (authUser !== null && product !== null) {
            var index = product.rating.find(item => item.username === authUser.username)
            if (index) {
                setStar(product.rating[index].score)
            }
        }
    }, [authUser])


    const update = () => {
        var cartList = localStorage.getObj("cart")
        var total = parseInt(localStorage.getItem("total"))

        if (cartList === null) {
            cartList = []
        }
        if (!total) {
            total = 0
        }
        var index = cartList.findIndex((item) => {
            return item.id === product._id && item.size === size
        })
        if (index === -1) {
            cartList.push({
                name: product.name,
                id: product._id,
                price: product.price * (100 - parseInt(product.discount)) / 100,
                size: size,
                img: Object.keys(product.image[0]).map((key) => product.image[0][key]).join(""),
                quantity: quantity
            })
            localStorage.setObj("cart", cartList)
        } else {
            cartList[index].quantity += quantity
            localStorage.setObj("cart", cartList)
        }
        total += quantity
        localStorage.setItem("total", total)
        setAlert(true)
    }

    const onChangeOption = (e) => {
        let target = hdList.find((item) => { return item.type === e.target.value })
        setImg(target.img)
    }

    const updateRating = async (rating) => {
        console.log("vote")
        return Axios.put("http://localhost:5000/products/rating/" + product._id, rating)
            .then((res) => {
                // console.log(res)
            })
            .catch((err) => { console.log(err) })
    }

    const ratingChanged = (newRating) => {
        setStar(newRating)
        if (authUser) {
            var rating = product.rating
            var index = rating.find(item => item.username === authUser.username)
            if (index) {
                index.score = newRating
            } else {
                rating.push({
                    username: authUser.username,
                    score: newRating
                })
            }
            updateRating({
                rating: rating
            })
        }
    };

    if (product === null) {
        return (<div></div>)
    }

    return (
        <div>
            <Modal show={alert} onHide={() => { setAlert(false) }}>
                <Modal.Header closeButton>
                    <span>Sản phẩm đã được thêm vào giỏ</span>
                </Modal.Header>
            </Modal>
            <Modal className="modal-box" show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <h2>HƯỚNG DẪN CHỌN SIZE</h2>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <select id="huong-dan-chon-size" onChange={(e) => { onChangeOption(e) }}>
                            {
                                hdList.map((item) =>
                                    <option>{item.type}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <img className="hd_img" src={img} alt="HDSD"></img>
                    </div>
                </Modal.Body>
            </Modal>
            <Container className="productInfo">
                <Col md="7">
                    <Carousel>
                        <div>
                            <img alt="" src={Object.keys(product.image[0]).map((key) => product.image[0][key]).join("")} />
                        </div>
                        <div>
                            <img alt="" src={Object.keys(product.image[1]).map((key) => product.image[1][key]).join("")} />
                        </div>
                    </Carousel>
                </Col>
                <Col md="5">
                    <Row className="pro_row">
                        <h1>{product.name}</h1>
                        <span className="star">{countStar(product.rating)}<FontAwesomeIcon className="star-icon" icon={faStar} /></span>
                        <span id="id_prod">{product.productId}</span>
                    </Row>
                    <Row className="pro_row price">
                        <span className={parseInt(product.discount) === 0 ? "no" : "discount"}>
                            {"-" + parseInt(product.discount) + "%"}
                        </span>
                        <span id="price">{(product.price * (100 - parseInt(product.discount)) / 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
                        <del className={parseInt(product.discount) === 0 ? "no" : "bonus"}>
                            {product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}
                        </del>
                    </Row>
                    <Row className="pro_row size">
                        {
                            product.size.map((item, index) =>
                                <div className={"swatch-element " + item.toLowerCase()}>
                                    <input id={"swatch-0-" + item.toLowerCase()} className="variant-0" type="radio" name="option1" onClick={(e) => { changeSize(e) }}></input>
                                    <label className={index === 0 ? "sd" : ""} htmlFor={"swatch-0-" + item.toLowerCase()}>
                                        <span>{item.toUpperCase()}</span>
                                    </label>
                                </div>)
                        }
                    </Row>
                    <Row className="pro_row rating">
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={32}
                            activeColor="#ffd700"
                            value={star}
                        />
                    </Row>
                    <Row className="pro_row">
                        <div className="hd" onClick={() => { setShow(true) }}>
                            <span>Hướng dẫn chọn size</span>
                        </div>
                    </Row>
                    <Row className="pro_row selector">
                        <div className="quantity_selector">
                            <input className="qty-btn" type="button" value="-" onClick={() => { setQuantity(quantity > 1 ? quantity - 1 : quantity) }} />
                            <input type="text" id="quantity" name="quantity" value={quantity} min="1" />
                            <input className="qty-btn" type="button" value="+" onClick={() => { setQuantity(quantity + 1) }} />
                        </div>
                        <div className="add_cart">
                            <button id="add_to_cart" type="button" onClick={update}>Thêm vào giỏ</button>
                        </div>
                    </Row>
                </Col>
            </Container>
        </div>
    )
}
