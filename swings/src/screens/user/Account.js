import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { AuthUserCtx } from '../../context/authUser';
import "../../css/account.css"
import Axios from 'axios'

const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }
    return item.user
}

const Item = ({ product }) => {
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
    return (
        <tr>
            <td className="order_id text-center">
                <Link to={"/account/orders/" + product._id} className="transactionId">
                    {"#" + product._id}
                </Link>
            </td>
            <td className="date text-center">
                <span>{formatDate(product.orderDate, 'dd/mm/yy')}</span>
            </td>
            <td className="total text-right">
                <span>{product.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
            </td>
            <td className="status text-center">
                <span>{product.isOrderCompleted ? "Đã xử lý" : "Chưa xử lý"}</span>
            </td>
        </tr>
    )
}

export const Account = () => {
    const { authUser, setAuthUser } = useContext(AuthUserCtx)
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            return await Axios
                .get("http://localhost:5000/" + authUser.userId)
                .then((res) => {
                    setUser(res.data.message)
                })
                .catch((err) => { console.log(err) })
        }
        const fetchTransactions = async () => {
            return await Axios
                .get("http://localhost:5000/order/" + authUser.username)
                .then((res) => { 
                    var index;
                    var arr = []
                    for (index = res.data.message.length-1; index >= 0; index--){
                        arr.push(res.data.message[index])
                    }
                    setTransactions(arr); 
                })
                .catch((err) => { console.log(err) })
        }
        if (authUser !== null) {
            fetchData()
            fetchTransactions()
        }
    }, [authUser])

    if (authUser === null) {
        return (<Redirect to="/login" />)
    }

    if (user === null) {
        return <div></div>
    }

    return (
        <div style={{ paddingBottom: 50 }}>
            <div className="header-title">
                <h1>Tài khoản của bạn</h1>
            </div>
            <Container>
                <Row>
                    <Col md={3} className="account-sidebar">
                        <h3>TÀI KHOẢN</h3>
                        <div className="account-content">
                            <div className="action-content">
                                <Link to="/account" className="link">
                                    <FontAwesomeIcon icon={faDotCircle} className="icon" />
                                    Thông tin tài khoản
                                </Link>
                                <Link to="/" className="link" onClick={() => { localStorage.removeItem("myUser"); setAuthUser(null) }}>
                                    <FontAwesomeIcon icon={faDotCircle} className="icon" />
                                    Đăng xuất
                                </Link>
                            </div>
                            <div className="action-content"></div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="customer-sidebar">
                            <h3 className="title-detail">Thông tin tài khoản</h3>
                            <h2 className="fullName">{user.name}</h2>
                            <p>username: {user.username}</p>
                            <p>email: {user.email}</p>
                            <p>số điện thoại: {user.phone}</p>
                            <p>địa chỉ: {user.address}</p>
                            <Link to="/custom" className="custom_account">
                                Chỉnh sửa thông tin
                            </Link>
                        </div>
                        <div className="customer-orders">
                            <div className="customer-table">
                                <p className="table-title">DANH SÁCH ĐƠN HÀNG MỚI NHẤT</p>
                                <div className="table-responsive">
                                    <Table className="table">
                                        <thead>
                                            <tr>
                                                <th className="order_id text-center">Mã đơn hàng</th>
                                                <th className="date text-center">Ngày đặt</th>
                                                <th className="total text-right">Thành tiền</th>
                                                <th className="status text-center">Trạng thái đơn hàng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transactions !== null
                                                    ? transactions.map((item) => <Item product={item} />)
                                                    : <div></div>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
