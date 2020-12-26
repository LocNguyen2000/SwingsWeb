import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Card } from "../card/Card"
import '../../css/nav.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Cart } from '../products/Cart'
import { ProductInfo } from '../products/ProductInfo'
import { ProductList } from '../products/ProductList'
import { Login } from '../auth/Login'
import { faShoppingCart, faUserCircle, faSearch, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { Register } from '../auth/Register'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DropDownNav } from './DropDownNav'
import { Comment } from '../Comments/Comment'
import { Account } from '../user/Account'
import { Transactions } from '../user/Transactions'
import { Custom } from '../user/Custom'
import { Search } from '../products/Search'
import { useContext } from 'react'
import { AuthUserCtx } from '../../context/authUser'
import { Homapage } from './Homapage'


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

const setWithExpiry = (key, obj, ttl) => {
    const now = new Date()
    const item = {
        user: obj,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export const Home = () => {
    const { authUser } = useContext(AuthUserCtx)
    const { setAuthUser } = useContext(AuthUserCtx)

    useEffect(() => {
        setAuthUser(getWithExpiry("myUser"))
        var obj = getWithExpiry("myUser")
        if (obj !== null) {
            setWithExpiry("myUser", { username: obj.username, userId: obj.userId }, 1000000)
        }
    }, [])
    const linkList =
        [{ type: "SALE OFF 50%", link: "sale-50" },
        { type: "ÁO", link: "ao" },
        { type: "ÁO SƠ MI", link: "ao-so-mi" },
        { type: "ÁO THUN", link: "ao-thun" },
        { type: "ÁO POLO", link: "ao-polo" },
        { type: "ÁO VEST", link: "ao-vest" },
        { type: "QUẦN", link: "quan" },
        { type: "QUẦN JEANS", link: "quan-jeans" },
        { type: "QUẦN DÀI", link: "quan-dai" },
        { type: "QUẦN TÂY", link: "quan-tay" },
        { type: "QUẦN SHORT", link: "quan-short" },
        { type: "QUẦN KAKI", link: "quan-kaki" },
        { type: "BALO-TÚI XÁCH", link: "balo" },
        { type: "GIÀY DÉP", link: "giay-dep" },
        { type: "GIẦY DA", link: "giay-da" },
        { type: "PHỤ KIỆN KHÁC", link: "phu-kien" },
        { type: "UNDERWEAR", link: "underwear" },
        { type: "VỚ", link: "vo" },
        { type: "THẮT LƯNG", link: "that-lung" },
        { type: "VÍ", link: "vi" },
        { type: "ÁO KHOÁC", link: "ao-khoac" },
        { type: "ÁO KHOÁC BÒ", link: "ao-khoac-bo" },
        { type: "ÁO NỈ", link: "ao-ni" },
        { type: "ÁO HOODIE", link: "ao-hoodie" },
        { type: "ÁO KHOÁC DA", link: "ao-khoac-da" },
        { type: "Sản phẩm mùa đông", link: "sp-mua-dong" }
    ];
    const list = [{
        type: "SẢN PHẨM",
        link: "/",
        sublist: [
            { type: "SALE OFF 50%", link: "/collections/sale-50" },
            {
                type: "ÁO", link: "/collections/ao", sublist: [
                    { type: "ÁO SƠ MI", link: "/collections/ao-so-mi" },
                    { type: "ÁO THUN", link: "/collections/ao-thun" },
                    { type: "ÁO POLO", link: "/collections/ao-polo" },
                    { type: "ÁO VEST", link: "/collections/ao-vest" },
                ]
            },
            {
                type: "QUẦN", link: "/collections/quan", sublist: [
                    { type: "QUẦN JEANS", link: "/collections/quan-jeans" },
                    { type: "QUẦN DÀI", link: "/collections/quan-dai" },
                    { type: "QUẦN TÂY", link: "/collections/quan-tay" },
                    { type: "QUẦN SHORT", link: "/collections/quan-short" },
                    { type: "QUẦN KAKI", link: "/collections/quan-kaki" },
                ]
            },
            { type: "BALO-TÚI XÁCH", link: "/collections/balo-tui-xach" },
            {
                type: "GIÀY DÉP", link: "/collections/giay-dep", sublist: [
                    { type: "GIẦY DA", link: "/collections/giay-da" }
                ]
            },
            {
                type: "PHỤ KIỆN KHÁC", link: "/collections/phu-kien", sublist: [
                    { type: "UNDERWEAR", link: "/collections/underwear" },
                    { type: "VỚ", link: "/collections/vo" },
                    { type: "THẮT LƯNG", link: "/collections/that-lung" },
                    { type: "VÍ", link: "/collections/vi" }
                ]
            },
        ]
    }, {
        type: "SP MÙA ĐÔNG",
        link: "/collections/sp-mua-dong",
        sublist: [
            { type: "ÁO KHOÁC", link: "/collections/ao-khoac" },
            { type: "ÁO KHOÁC BÒ", link: "/collections/ao-khoac-bo" },
            { type: "ÁO NỈ", link: "/collections/ao-ni" },
            { type: "ÁO HOODIE", link: "/collections/ao-hoodie" },
            { type: "ÁO KHOÁC DA", link: "/collections/ao-khoac-da" },
        ]
    }, {
        type: "SALE UPTO 50%",
        link: "/collections/sale-50"
    }]

    return (
        <div>
            <div className="navBarMain">
                <Container>
                    <Row className="align-items-center">
                        <Col lg='3' className="brand">
                            <a href="/">
                                <img src="https://image.freepik.com/free-vector/raven-esport-gaming-mascot-logo-template_20684-157.jpg" alt="swings-logo" />
                                <span>SWINGS</span>
                            </a>
                        </Col>
                        <Col lg='7' className="searchBar">
                            <form className="search-box" action="/search">
                                <input type="search" id="search" placeholder="Nhập tên sản phẩm.." name="search" />
                                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                            </form>
                        </Col>
                        <Col lg='2' className="icon-box">
                            <a href="/cart" className="icon">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </a>
                            <a href="/login" className="icon">
                                <FontAwesomeIcon icon={faUserCircle} />
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Row className="dropDownNav">
                <Container className="p-0 d-flex">
                    {
                        list.map(item =>
                            <Col lg="2" className="type p-0">
                                <DropDownNav list={item} />
                            </Col>
                        )
                    }
                </Container>
            </Row>

            <Switch className="main_body">
                <Route path='/cart' component={Cart} />
                <Route path='/info' component={ProductInfo} />
                <Route path='/comments' component={Comment} />
                {
                    linkList.map(item => {
                        return <Route path={"/collections/" + item.link} render={() => (
                            <ProductList type={item.type} link={item.link} />
                        )} />
                    })
                }
                <Route path="/collections/:productId" name="product" component={ProductInfo} />
                <Route path="/collections">
                    <Redirect from="/collections" to="/" />
                </Route>
                <Route path="/search" component={Search} />
                <Route path="/login" component={Login} />
                <Route path="/comment" component={Comment} />
                <Route path="/register" exact component={Register} />
                <Route path="/account/orders/:id" component={Transactions} />
                <Route path="/account" component={Account} />
                <Route path="/custom" component={Custom} />
                <Route path='/' component={Homapage} />
            </Switch>

            <Row className="footer-main">
                <Container className="footer">
                    <Col md="3" className="footer-1">
                        <h5>SWINGS</h5>
                        <div className="para">
                            <p>Đội ngũ Swings luôn coi trọng lợi ích của khách hàng lên hàng đầu, chỉn chu từng bước để mang tới những sản phẩm hoàn hảo nhất từ “đầu tới cuối”.</p>
                        </div>
                        <div className="logo-footer">
                            <img src="https://file.hstatic.net/1000300454/file/logo_bct_019590229b4c4dfda690236b67f7aff4.png" alt="logo-footer" />
                        </div>
                    </Col>
                    <Col md="3" className="footer-2">
                        <h5>KẾT NỐI VỚI CHÚNG TÔI</h5>
                        <div className="brand-icon">
                            <FontAwesomeIcon className="icon-footer" icon={faFacebookSquare} />
                            <FontAwesomeIcon className="icon-footer" icon={faInstagramSquare} />
                            <FontAwesomeIcon className="icon-footer" icon={faTwitterSquare} />
                            <FontAwesomeIcon className="icon-footer" icon={faYoutubeSquare} />
                        </div>
                    </Col>
                    <Col md="3" className="footer-3">
                        <h5>TƯ VẤN BÁN HÀNG (9:30 - 21:30)</h5>
                        <div className="phoneNumber">
                            <FontAwesomeIcon className="phone-icon" icon={faPhoneSquare} />
                            <span>0398 050237</span>
                        </div>
                        <div className="para">
                            <p>Tất cả các ngày trong tuần</p>
                        </div>
                    </Col>
                    <Col md="3" className="footer-4">
                        <h5>CHĂM SÓC KHÁCH HÀNG (9:30 - 21:00)</h5>
                        <div className="phoneNumber">
                            <FontAwesomeIcon className="phone-icon" icon={faPhoneSquare} />
                            <span>0398 050237</span>
                        </div>
                        <div className="para">
                            <p>Tất cả các ngày trong tuần</p>
                        </div>
                    </Col>
                </Container>
            </Row>
        </div>
    )
}


