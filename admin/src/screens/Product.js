import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../css/product.css";
import StarOutline from "@material-ui/icons/StarOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";
import { AddProductForm } from "./AddProductForm";

const typeList = [{ type: "SALE OFF 50%", link: "sale-50" },
{ type: "ÁO", link: "ao" },
{ type: "ÁO SƠ MI", link: "ao-so-mi" },
{ type: "ÁO THUN", link: "ao-thun" },
{ type: "ÁO POLO", link: "ao-polo" },
{ type: "ÁO LEN", link: "ao-len" },
{ type: "ÁO VEST", link: "ao-vest" },
{ type: "QUẦN", link: "quan" },
{ type: "QUẦN JEAN", link: "quan-jean" },
{ type: "QUẦN DÀI", link: "quan-dai" },
{ type: "QUẦN TÂY", link: "quan-tay" },
{ type: "QUẦN SHORT", link: "quan-short" },
{ type: "QUẦN KAKI", link: "quan-kaki" },
{ type: "QUẦN JOGGER", link: "quan-jogger" },
{ type: "BALO-TÚI XÁCH", link: "balo" },
{ type: "GIÀY DÉP", link: "giay" },
{ type: "GIẦY DA", link: "giay-da" },
{ type: "GIẦY THỂ THAO", link: "giay-the-thao" },
{ type: "PHỤ KIỆN KHÁC", link: "phu-kien" },
{ type: "UNDERWEAR", link: "underwear" },
{ type: "VỚ", link: "vo" },
{ type: "THẮT LƯNG", link: "that-lung" },
{ type: "VÍ", link: "vi" },
{ type: "ÁO KHOÁC", link: "ao-khoac" },
{ type: "ÁO KHOÁC BÒ", link: "ao-khoac-bo" },
{ type: "ÁO NỈ", link: "ao-ni" },
{ type: "ÁO HOODIE", link: "ao-hoodie" },
{ type: "ÁO KHOÁC DA", link: "ao-khoac-da"},
{ type: "ÁO KHOÁC DA", link: "ao-khhoac-da"},
{ type: "ÁO KHOÁC BÒ", link: "ao-khhoac-bo"},
{ type: "ÁO JEANS", link: "ao-jean"},
{ type: "SẢN PHẨM MÙA ĐÔNG", link: "sp-mua-dong" }]

const RenderProduct = (props) => {
    const { product, setProducts, setId, products } = props
    const sale = ["0", "50"]
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
    function deleteProduct(e, productName) {
        e.preventDefault()
        let arr = products
        setProducts(arr.filter(product => product.name !== productName))
        setId(product._id)
    }

    const updateSale = async (id, obj) => {
        return Axios
            .put("http://localhost:5000/products/" + id, obj)
            .then((res) => {
                // console.log(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        var obj = {
            ...product,
            discount: parseInt(e.target.value),
        }
        updateSale(product._id, obj)
    }
    return (
        <tr>
            <td>{[product._id.substring(0, 12), product._id.substring(13)].join(" ")}</td>
            <td>{product.name}</td>
            <td>
            {
                typeList.map(item => {
                    if (item.link === product.category) {
                        return (<span>
                            {item.type}
                        </span>)
                    }
                    return <span></span>
                })
            }
            </td>
            <td>
            {
                typeList.map(item => {
                    if (item.link === product.subcategory) {
                        return (<span>
                            {item.type}
                        </span>)
                    }
                    return <span></span>
                })
            }
            </td>
            <td>{product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</td>
            <td>{countStar(product.rating)} <StarOutline className="star-icon" /></td>
            <td>
                {
                    product.size.map(item => <div>{item}</div>)
                }
            </td>
            <td>
                <select onChange={handleChange}>
                    {
                        sale.map(item => {
                            if (item === product.discount) {
                                return (<option value={item} selected="selected">{item + "%"}</option>)
                            }
                            return <option value={item}>{item + "%"}</option>
                        })
                    }
                </select>
            </td>
            <td>
                <img src={Object.keys(product.image[0]).map((key) => product.image[0][key]).join("")} alt='' width="130px" height="130px"></img>
            </td>
            <td>
                <div id="delete-icon"
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

export const Product = () => {
    const [products, setProducts] = useState(null);
    const [id, setId] = useState(null)
    const fetchData = async () => {
        return await Axios
            .get("http://localhost:5000/products/allProduct")
            .then((res) => {
                var index;
                var arr = []
                for (index = res.data.message.length - 1; index >= 0; index--) {
                    arr.push(res.data.message[index])
                }
                setProducts(arr)
                console.log(arr)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const updateData = async () => {
            return await Axios
                .delete("http://localhost:5000/products/" + id)
                .then((res) => { 
                    // console.log("del successful") 
                })
                .catch((err) => { console.log(err) })
        }
        if (id !== null) {
            updateData();
            setId(null)
        }
    }, [id])
    if (products === null) {
        return <div></div>
    }

    return (
        <div className="product">
            <h1>Thông tin sản phẩm</h1>
            <div className="post-product">
                <AddProductForm />
            </div>
            <Table className="table-data " striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Size</th>
                        <th>Discount</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products !== null
                        ? products.map(item => <RenderProduct product={item} setProducts={setProducts} setId={setId} products={products} />)
                        : <tr></tr>
                    }
                </tbody>
            </Table>
        </div>
    );
}

