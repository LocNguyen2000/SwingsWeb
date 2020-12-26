import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap'
import "../../css/cart.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { AuthUserCtx } from '../../context/authUser';
import Axios from 'axios';
import { Email } from '@material-ui/icons';

const Item = (props) => {
    // const [name, setName] = useState(props.name);
    // const [id, setId] = useState(props.id)
    // const [price, setPrice] = useState(props.price)
    const { authUser } = useContext(AuthUserCtx)

    const [quantity, setQuantity] = useState(props.quantity);
    useEffect(() => {
        setQuantity(props.quantity)
    })

    const updateCartItem = (qty) => {
        var list = localStorage.getObj("cart")
        var index = list.findIndex((item) => {
            return item.id === props.id && item.size === props.size
        })
        list[index].quantity += qty
        props.setProducts(list)
        localStorage.setObj("cart", list)
        return list[index].quantity
    }

    const updateTotal = (qty) => {
        var x = parseInt(localStorage.getItem('total'))
        localStorage.setItem('total', x + qty)
        return x + qty
    }

    const add = () => {
        props.setTotal(props.total + props.price)
        setQuantity(updateCartItem(1))
        props.setTotalQty(updateTotal(1))
    }

    const del = () => {
        if (quantity > 1) {
            props.setTotal(props.total - props.price)
            setQuantity(updateCartItem(-1))
            props.setTotalQty(updateTotal(-1))
        }
    }

    const onDelete = () => {
        var list = localStorage.getObj("cart")
        var index = list.findIndex((item) => {
            return item.id === props.id && item.size === props.size
        })
        list.splice(index, 1)
        localStorage.setObj("cart", list)
        props.setTotalQty(updateTotal((-1) * quantity))
        props.setProducts(list)
        props.setTotal(props.total - props.price * quantity)
    }
    return (
        <div className="cart-item">
            <div className="product_img">
                <Link to={"/collections/" + props.id}>
                    <img src={props.img} alt="product_img" />
                </Link>
            </div>
            <div className="content-item">
                <h3>
                    <Link to={"/collections/" + props.id} className="name">
                        {props.name}
                    </Link>
                </h3>
                <span className="price-item">{props.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
                <span className="size">Size: {props.size.toUpperCase()}</span>
                <div className="quantity_selector">
                    <input className="qty-btn"
                        type="button"
                        value="-"
                        onClick={() => { del() }} />
                    <input type="text" id="quantity" name="quantity" value={quantity} min="1" />
                    <input className="qty-btn"
                        type="button"
                        value="+"
                        onClick={() => { add() }} />
                </div>
            </div>
            <p className="price-items">
                <span>{(props.price * quantity).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
            </p>
            <Link to="/cart" onClick={onDelete} className="del">
                <img src="//theme.hstatic.net/200000201725/1000627199/14/ic_close.png?v=372" />
            </Link>
        </div>
    )
}

export const Cart = () => {
    const [order, setOrder] = useState(null)
    const { authUser, setAuthUser } = useContext(AuthUserCtx)
    const [user, setUser] = useState(null)
    const [fullname, setFullname] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("Khách hàng")
    const calculate = (products) => {
        var total = 0
        var item
        if (products.length > 0) {
            for (item in products) {
                total += products[item].price * products[item].quantity
            }
        }
        return total
    }

    useEffect(() => {
        const fetchData = async () => {
            await Axios
                .get("http://localhost:5000/" + authUser.userId)
                .then((res) => {
                    var obj = res.data.message
                    setUser(obj)
                    setUsername(obj.username)
                    setFullname(obj.name)
                    setAddress(obj.address)
                    setEmail(obj.email)
                    setPhone(obj.phone)
                })
                .catch((err) => { console.log(err) })
        }
        if (authUser !== null){
            fetchData()
        }
        if (authUser !== null) {
            setUsername(authUser.username)
        }
    }, [authUser])
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState(localStorage.getObj("cart") === null ? [] : localStorage.getObj("cart"))
    const [total, setTotal] = useState(calculate(products))
    const [totalQty, setTotalQty] = useState(parseInt(localStorage.getItem("total")))
    const [empty, setEmpty] = useState(false)
    const updateItem = () => {
        if (totalQty === 0) {
            setEmpty(true)
        } else {
            setShow(true)
            var items = localStorage.getObj("cart")
            var arr = []
            var index
            for (index of items) {
                arr.push({
                    product: index.id,
                    price: index.price,
                    quantity: index.quantity,
                    size: index.size.toUpperCase()
                })
            }
            setOrder(arr)
        }
    }

    if (authUser !== null && user === null) {
        return (<div></div>)
    }

    const postOrder = async (order) => {
        return Axios.post("http://localhost:5000/order/order", order)
        .then((res) => {
            // console.log(res.data.message)
        })
        .catch((err) => {console.log(err)})
    }

    const onSubmit_ = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        localStorage.setObj("cart", [])
        localStorage.setItem('total', 0)
        var orderSchema = {
            username: username,
            email: email,
            name: fullname,
            phone: phone,
            address: address,
            order: order,
            total: total
        }
        postOrder(orderSchema)
    }


    return (
        <Container>
            <Modal show={empty} onHide={() => { setEmpty(false) }}>
                <Modal.Header closeButton>
                    <span>Bạn không có vật phẩm nào trong giỏ</span>
                </Modal.Header>
            </Modal>
            <Modal className="modal_box" show={show} onHide={() => { setShow(false) }}>
                <Modal.Header closeButton>
                    <h3>Thông tin đơn hàng</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit_}>
                        <Form.Group controlId="userName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="" defaultValue="Khách hàng" value={username} disabled />
                        </Form.Group>
                        <Form.Group controlId="fullName">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập họ tên người mua" defaultValue={fullname} onChange={(e) => {setFullname(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Nhập email" defaultValue={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" placeholder="Nhập số điện thoại" defaultValue={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="Nhập địa chỉ" defaultValue={address} onChange={(e) => {setAddress(e.target.value)}} />
                        </Form.Group>
                        <Button variant="secondary" type="submit" disabled={fullname.trim() === "" || email.trim() === "" || phone.trim() === "" || address.trim() ===""}>
                            Gửi đơn hàng
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row className="wrap-heading">
                <div className="heading-page">
                    <h3>Giỏ hàng của bạn</h3>
                    <p>Bạn có {totalQty ? totalQty : 0} sản phẩm trong giỏ hàng</p>
                </div>
            </Row>
            <Row className="wrap-cart">
                <Col md={8} className="table-cart">
                    {
                        products.map(item => {
                            return (<Item {...item} setTotal={setTotal} total={total} setTotalQty={setTotalQty} setProducts={setProducts} />)
                        })
                    }
                </Col>
                <Col md={4}>
                    <div className="sidebox-order">
                        <div className="sidebox-inner">
                            <div className="sidebox-title">
                                <h3>Thông tin đơn hàng</h3>
                            </div>
                            <div className="sidebox-total">
                                <p>Tổng tiền:<span>{total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span></p>
                            </div>
                            <div className="sidebox-text">
                                <p>Phí vận chuyển sẽ được thông báo sau.</p>
                            </div>
                            <div className="sidebox-action">
                                <button className="submit-items" onClick={() => { updateItem() }} disabled={totalQty === 0}>Thanh toán</button>
                                <p>
                                    <Link to="/" className="returnBtn">
                                        <FontAwesomeIcon icon={faStore} className="icon" />
                                        Tiếp tục mua hàng
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
