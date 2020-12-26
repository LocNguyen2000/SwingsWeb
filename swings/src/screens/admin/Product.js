import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../css/product.css";
import StarIcon from "@material-ui/icons/Star";
import StarOutline from "@material-ui/icons/StarOutline";
import DeleteIcon from "@material-ui/icons/Delete";

let myProducts = [
  {
    name: "1",
    category: "Shirt",
    price: "100000",
    rating: "1",
    size: "L",
    discount: "0%",
    image: "http://product.hstatic.net/200000201725/product/_nik6857_3aaee08f035c41399c4792651fceac49_grande.jpg",
  },
  {
    name: "2",
    category: "Shirt",
    price: "100000",
    rating: "2",
    size: "XL",
    discount: "0%",
    image: "http://product.hstatic.net/200000201725/product/_nik6857_3aaee08f035c41399c4792651fceac49_grande.jpg",
  },
  {
    name: "3",
    category: "Shirt",
    price: "100000",
    rating: "3",
    size: "M",
    discount: "50%",
    image: "http://product.hstatic.net/200000201725/product/_nik6857_3aaee08f035c41399c4792651fceac49_grande.jpg",
  },
];

export const Product = () => {
  const [products, setProducts] = useState(myProducts);

  function starRating(rating) {
    let arr = [];
    for (let i = 0; i < rating; i++) arr.push(<StarIcon />);
    for (let i = 0; i < 5 - rating; i++) arr.push(<StarOutline />);
    return arr;
  }
  function deleteProduct(e, productName) {
    e.preventDefault()
    let arr = products
    setProducts(arr.filter(product => product.name !== productName))
  }

  useEffect(() => {}, [products]);

  const renderProduct = (product, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>{starRating(product.rating)}</td>
        <td>{product.size}</td>
        <td>
          <select>
            <option>0%</option>
            <option>50%</option>
          </select>
        </td>
        <td>
          <img src={product.image} alt = '' width="130px" height="130px"></img>
        </td>
        <td>
          <div
            onClick={(e) => {
              deleteProduct(e, product.name);
            }}
          >
            <DeleteIcon></DeleteIcon>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="product">
      <div></div>
      <Table className="table-data " striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Size</th>
            <th>Discount (%)</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{products.map(renderProduct)}</tbody>
      </Table>
    </div>
  );
}

