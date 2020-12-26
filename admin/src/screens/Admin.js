import React, { useContext, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoIcon from '@material-ui/icons/Info';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Form, FormControl, Button } from "react-bootstrap";
import "../css/admin.css"
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { Product } from "./Product.js";
import { Users } from './Users';
import { UserDetail } from './UserDetail';
import { Order } from './Order';
import { Search } from './Search';
import { OrderDetail } from './OrderDetail';
import { AuthAdminCtx } from '../context/authAdmin';
import { ExitToApp } from '@material-ui/icons';
import { Homepage } from './Homepage';

const SidebarData = [{
    title: "Home",
    icon: <HomeIcon />,
    link: "/homepage",
},
{
    title: "Products",
    icon: <InfoIcon />,
    link: "/homepage/products",
},
{
    title: "Users",
    icon: <PeopleOutlineIcon />,
    link: "/homepage/users",
},
{
    title: "Order",
    icon: <ReceiptIcon />,
    link: "/homepage/orders",
}
];

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

export const Admin = () => {
    // const { authAdmin, setAuthAdmin } = useContext(AuthAdminCtx)
    const [state, setState] = useState(false)
    if (getWithExpiry("myAdmin") === null) {
        return <Redirect to="/" />
    } else {
        setWithExpiry("myAdmin", { username: getWithExpiry("myAdmin") }, 1000000)
    }
    return (
        <div className="admin">
            <div className="Sidebar">
                <div className='Sidebar-header'>
                    <span>Swings Admin</span>
                </div>
                <ul className="SidebarList">
                    {SidebarData.map((val, key) => {
                        return (
                            <li
                                key={key}
                                className="row"
                                id={window.location.pathname === val.link ? "active" : ""}
                                onClick={() => {
                                    window.location.pathname = val.link;
                                }}
                            >
                                <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
                            </li>
                        );
                    })}
                    <li
                        className="row"
                        onClick={() => {
                            localStorage.removeItem("myAdmin")
                            setState(!state)
                        }}
                    >
                        <div id="icon"><ExitToApp /></div> <div id="title">Logout</div>
                    </li>
                </ul>
            </div>
            <div>
                <div className='search'>
                    <Form className='form-search' action="/homepage/search" inline>
                        <FormControl type="text" placeholder="Nhập tên sản phẩm..." className="mr-sm-2" name="search" />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>
                </div>
                <Switch>
                    <Route path="/homepage/products" component={Product} />
                    <Route path="/homepage/search" component={Search} />
                    <Route path="/homepage/orders/:id" component={OrderDetail} />
                    <Route path="/homepage/orders" component={Order} />
                    <Route path="/homepage/users/:username" component={UserDetail} />
                    <Route path="/homepage/users" component={Users} />
                    <Route path="/homepage" component={Homepage} />
                </Switch>
            </div>
        </div>
    )
}