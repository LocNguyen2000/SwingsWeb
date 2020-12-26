import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InfoIcon from '@material-ui/icons/Info';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Form, FormControl,Button } from "react-bootstrap";
import "../../css/admin.css"
import { Link, Route, Switch } from "react-router-dom";
import {Product} from "./Product.js";

const SidebarData = [{
    title: "Home",
    icon: <HomeIcon />,
    link: "/",
},
{
    title: "Products",
    icon: <InfoIcon />,
    link: "/products",
},
{
    title: "Users",
    icon: <PeopleOutlineIcon />,
    link: "/users",
},
{
    title: "Order",
    icon: <ReceiptIcon />,
    link: "/orders",
}
];

export const Admin = () => {
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
                </ul>
            </div>
            <div>
                <div className='search'>
                    <Form className='form-search' inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </div>
                <Switch>
                    <Route path="/">
                        <Product />
                    </Route>
                    {/* <Route path="/orders">
                        <Order />
                    </Route> */}
                </Switch>
            </div>
        </div>
    )
}