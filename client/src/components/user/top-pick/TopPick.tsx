import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import styles from './toppick.module.css';
import { URLIMG } from '../../../constants/urlimg';
import { ENDPOINT } from '../../../constants/endpoint';
import { IProduct, IToppickproduct } from '../../../model/PublichHomeProduct';
import { Link } from 'react-router-dom';
interface IProductTopPick {
  toppick: IToppickproduct[],
}
const NewProduct = (props: IProductTopPick) => {
  const [dataProducts, setProducts] = useState<IToppickproduct[]>([])
  useEffect(() => {
    setProducts(props.toppick);
  }, [])
  const renderProduct = (data: IToppickproduct[]) => {
    return data?.map((item, key) => {
      return (
        <Col lg={4} xl={3} md={6} sm={12} className='py-4' key={key}>
          <Link className={`${styles['card-link']}`} to={`/product/${item.id_product}`}>
            <Card.Img src={`${ENDPOINT.URL}/${URLIMG.PRODUCT}${item.img_url}`} className='img-fluid'>
            </Card.Img>
            <div className={`${styles['list-color']}`}>
              
                
                  <Card.Img  src={`${ENDPOINT.URL}/${URLIMG.COLOR}${item.color_url}`} className={`${styles['color-product']} img-fluid`}>
                  </Card.Img>
               
            
              {/* <Card.Img src={`${ENDPOINT.URL}${URLIMG.COLOR}${item.color[]}`} className={`${styles['color-product']} img-fluid`}>
                        </Card.Img> */}
            </div>
            <div className={`${styles['description']}`}>
              <Card.Text className='text-uppercase'>{item.name_menu}</Card.Text>
              <div className='d-flex'>
                
                        <Card.Text  className='text-uppercase '>{item.name_size}</Card.Text>
                  
                  
               
              </div>
            </div>
            <h3>{item.name}</h3>
            <h5 className='text-danger'>{item.price} VNĐ</h5>
          </Link >
        </Col>
      )
    })

  }
  return (
    <div >
      <h1>
        Mua Nhiều Nhất
      </h1>
      <Row>
        {dataProducts !== [] ? renderProduct(dataProducts) : ''}

      </Row>
    </div>
  )
}

export default NewProduct;
