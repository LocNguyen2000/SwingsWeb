import React from 'react'
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import "../../css/card.css"

export const Card = (props) => {
    const { product } = props;
    return (
        <Col md="3" className="item">
            <div>
                <div className={parseInt(product.discount) === 0 ? "no" : "product-sale"}>
                    <span>{"-" + product.discount + "%"}</span>
                </div>
                <a className="name" href={`/collections/${product._id}`}>
                    <img className="img2" src={Object.keys(product.image[1]).map((key) => product.image[1][key]).join("")} alt={product.name} />
                    <img className="img1" src={Object.keys(product.image[0]).map((key) => product.image[0][key]).join("")} alt={product.name} />
                </a>
            </div>
            <div className="namePrice">
                <a className="name" href={`/collections/${product._id}`}>{product.name}</a>
                <div className="price">
                    <span className={(parseInt(product.discount) > 0) ? "discount" : "no discount"}>
                        {(product.price*parseInt(product.discount)/100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}
                    </span>
                    <span className="real">
                        {(parseInt(product.discount) === 0) 
                         ? (product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫')
                         : <del>{product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₫'}</del>} 
                    </span>
                </div>
            </div>
        </Col>
    )
}
