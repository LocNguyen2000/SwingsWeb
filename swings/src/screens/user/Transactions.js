import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { AuthUserCtx } from '../../context/authUser';
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import "../../css/transactions.css"
import Axios from 'axios'
import { TransactionItem } from './TransactionItem';

export const Transactions = ({ match }) => {
    // console.log(match.params.id)
    const { authUser, setAuthUser } = useContext(AuthUserCtx)
    const [transactions, setTransactions] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            await Axios
                .get("http://localhost:5000/" + authUser.userId)
                .then((res) => {
                    setUser(res.data.message)
                    console.log(res.data.message)
                })
                .catch((err) => { console.log(err) })
        }
        const fetchTransactions = async () => {
            await Axios
                .get("http://localhost:5000/order/getOrder/" + match.params.id)
                .then((res) => { setTransactions(res.data.message) })
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
        return (<div></div>)
    }

    if (transactions === null) {
        return (<div></div>)
    }

    return (
        <div style={{ paddingBottom: 50 }}>
            <div className="header-title">
                <h1>Chi tiết đơn hàng</h1>
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
                            <h3 className="title-detail">ĐƠN HÀNG: {"#" + match.params.id}</h3>
                            <h2 className="fullName">{transactions.name}</h2>
                            <p>username: {transactions.username}</p>
                            <p>email: {transactions.email}</p>
                            <p>số điện thoại: {transactions.phone}</p>
                            <p>địa chỉ: {transactions.address}</p>
                            <Link to="/account" className="custom_account">
                                Quay lại trang tài khoản
                            </Link>
                        </div>
                        <div className="customer-orders">
                            <div className="customer-table">
                                <p className="table-title">DANH SÁCH ĐƠN HÀNG MỚI NHẤT</p>
                                <div className="table-responsive">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th className=""></th>
                                                <th className="">Sản phẩm</th>
                                                <th className="text-center">Mã sản phẩm</th>
                                                <th className="text-right">Đơn giá</th>
                                                <th className="text-center">Số lượng</th>
                                                <th className="total text-right">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transactions.order.map((item) => <TransactionItem item={item} />)
                                            }
                                            <tr className="table-footer">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right">
                                                    <span>Tổng tiền:</span>
                                                </td>
                                                <td className="text-right">
                                                    <span>{transactions.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</span>
                                                </td>
                                            </tr>
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
