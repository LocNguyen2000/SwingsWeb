import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from "yup";
import { AuthUserCtx } from '../../context/authUser'
import "../../css/custom.css"

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


export const Custom = () => {
    const { authUser, setAuthUser } = useContext(AuthUserCtx)
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [user, setUser] = useState(null)

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         Axios.get("http://localhost:5000/" + authUser.userId)
    //         .then((res) => {setUser(res.data.message); console.log(res.data.message)})
    //         .catch((err) => {console.log(err)})
    //     }
    //     fetchUserProfile()
    // },[])

    const updateProfile = async (user) => {
        Axios.put("http://localhost:5000/" + authUser.userId, user)
            .then((res) => { 
                // console.log(res.data.message) 
            })
            .catch((res) => { console.log(res) })
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        var userSample = {
            name: fullname,
            email: email,
            address: address,
            phone: phone,
        }
        updateProfile(userSample)
    }
    const onChange = (event, setValue) => {
        setValue(event.currentTarget.value)
    }

    if (authUser === null) {
        return (<Redirect to="/login" />)
    }

    return (
        <div style={{ paddingBottom: 50 }}>
            <div className="header-title">
                <h1>Thông tin địa chỉ</h1>
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
                    <Col md={5}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="fullName">
                                <Form.Label>Họ tên</Form.Label>
                                <Form.Control type="text" placeholder="Nhập họ tên" onChange={(event) => { onChange(event, setFullname) }} />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Nhập email" onChange={(event) => { onChange(event, setEmail) }} />
                            </Form.Group>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" placeholder="Nhập số điện thoại" onChange={(event) => { onChange(event, setPhone) }} />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" placeholder="Nhập địa chỉ" onChange={(event) => { onChange(event, setAddress) }} />
                            </Form.Group>
                            <Button variant="secondary" type="submit">
                                Cập nhật
                        </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
