import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../css/user.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";


const RenderUser = (props) => {
    const { user, users, setUsers } = props
    function deleteUser(e, username) {
        e.preventDefault();
        let arr = users;
        setUsers(arr.filter((user) => user.username !== username));
        // console.log(arr);
    }
    return (
        <tr>
            <td>{user._id.substring(0, 12)}...</td>
            <td>{user.name}</td>
            <td>
                <a href={"/homepage/users/" + user.username} className="link">{user.username}</a>
            </td>
            {/* <td>123</td> */}
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            {/* <td>
                <div
                    onClick={(e) => {
                        deleteUser(e, user.username);
                    }}
                >
                    <DeleteIcon />
                </div>
            </td> */}
        </tr>
    );
};

export const Users = () => {
    const [users, setUsers] = useState(null);

    const fetchUserData = async () => {
        return await Axios
            .get("http://localhost:5000/")
            .then((res) => {
                var index;
                var arr = []
                for (index = res.data.message.length - 1; index >= 0; index--) {
                    arr.push(res.data.message[index])
                }
                setUsers(arr)
                // console.log(arr)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUserData()
    }, [])
    
    if(users === null) {
        return <div></div>
    }

    return (
        <div className="user">
            <h1>Thông tin tài khoản</h1>
            <Table className="table-data " striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        {/* <th>Password</th> */}
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(item => <RenderUser user={item} users={users} setUsers={setUsers} /> )
                    }
                </tbody>
            </Table>
        </div>
    );
}

