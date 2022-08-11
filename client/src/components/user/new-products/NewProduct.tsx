import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import styles from './newproduct.module.css';
import { URLIMG } from '../../../constants/urlimg';
import { ENDPOINT } from '../../../constants/endpoint';
import { IProduct } from '../../../model/PublichHomeProduct';
import { Link } from 'react-router-dom';
interface IProductHome {
    products_new: IProduct[],
}
const NewProduct = (props: IProductHome) => {
    const [dataProducts, setProducts] = useState<IProduct[]>([])
    useEffect(() => {
        setProducts(props.products_new);
    }, [])
    const renderProduct = (data: IProduct[]) => {
        return data?.map((item, key) => {
            return (
                <Col lg={4} xl={3} md={6} sm={12} className='py-4' key={key}>
                    <Link className={`${styles['card-link']}`} to={`/product/${item.id}`}>
                        <Card.Img src={`${ENDPOINT.URL}/${URLIMG.PRODUCT}${item.image ? item.image[0].url : ''}`} className='img-fluid'>
                        </Card.Img>
                        <div className={`${styles['list-color']}`}>
                            {item.colors?.map((color, key) => {
                                return (
                                    <Card.Img key={key} src={`${ENDPOINT.URL}/${URLIMG.COLOR}${color.url}`} className={`${styles['color-product']} img-fluid`}>
                                    </Card.Img>
                                )
                            })}
                            {/* <Card.Img src={`${ENDPOINT.URL}${URLIMG.COLOR}${item.color[]}`} className={`${styles['color-product']} img-fluid`}>
                        </Card.Img> */}
                        </div>
                        <div className={`${styles['description']}`}>
                            <Card.Text className='text-uppercase'>{item.menu?.name}</Card.Text>
                            <div className='d-flex'>
                                {item.sizes?.map((size, index) => {
                                    if (item.sizes !== undefined) {
                                        if (index === item.sizes.length - 1) {
                                            return (
                                                <Card.Text key={index} className='text-uppercase '>{size.name}</Card.Text>
                                            )
                                        }
                                    }
                                    return (
                                        <Card.Text key={index} className='text-uppercase '>{size.name}-</Card.Text>
                                    )
                                })}
                            </div>
                        </div>
                        <h3>{item.name}</h3>
                        <h5 className='text-danger'>{item.price} VND</h5>
                    </Link >
                </Col>
            )
        })

    }
    return (
        <div >
            <h1>
                Sản Phẩm Mới
            </h1>
            <Row>
                {dataProducts !== [] ? renderProduct(dataProducts) : ''}

            </Row>
        </div>
    )
}

export default NewProduct;
