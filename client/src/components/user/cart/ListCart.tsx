/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Button, Card, CloseButton, Col, Modal, Row } from 'react-bootstrap';
import img1 from '../../../img/product.png';
import styles from './cart.module.css';
import { RiCloseFill } from 'react-icons/ri';
import { ICart, IProductDetail } from '../../../model/Cart';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as action from '../../../action/cart.action';
import { ENDPOINT } from '../../../constants/endpoint';
import { URLIMG } from '../../../constants/urlimg';
import { IpropsCart } from '../../../model/Props';


const ListCart = (props: IpropsCart) => {
    const Dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [id_deletecart,setid_deletecart] = useState<number>();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteItemCart =(id: number) =>{
        Dispatch(action.deleteItemCart(id));
    }
    const renderCart = (data: IProductDetail[])=>{
        if(data.length> 0){
            return data.map((item,index)=>{
                
                return (
                    <Col key={index} sm={8} lg={12} className='d-flex w-100' >
                    <Link className={`${styles['img-product']} h-50 w-25 me-2 `} to={`/product/${item.id_product}`}><Card.Img src={`${ENDPOINT.URL}/${URLIMG.PRODUCT}${item.url_image}`} ></Card.Img></Link>
                    <div className=' w-75'>
                        <div className='w-100'>
                            <div className='d-flex justify-content-between'>
                            <h5><Link to={`/product/${item.id_product}`}>{item.name}</Link></h5>
                            <CloseButton onClick={()=>{
                                handleShow();
                                setid_deletecart(index);
                            }} className={`${styles['close']} p-0 `} />
                            </div>
                            <p>Mã Sản Phẩm: {item.id_product}</p>
                            <p>Màu Sắc: {item.name_color}</p>
                            <p>Kích Cỡ: {item.name_size}</p>
                            <p className='text-warning'>Giá: {item.price_product} VNĐ</p>
                            <div className='d-flex justify-content-between flex-wrap '>
                                <p>Số Lượng: {item.amount}</p>
                                <h5 className='text-warning text-uppercase
                    '>Tổng: {item.price} VNĐ </h5>
                            </div>
                        </div>
                    </div>
                </Col>
                )
            })
        }

    }
    
    return (
        <div>
            <h1>Giỏ Hàng</h1>
            <div className={`d-flex w-100 ${styles['cart']}`}>
            <Row  className={`my-3 me-2  ${styles['listcart']}`}>
                {renderCart(props.data)}
            </Row>
            <Row className={`my-3 me-2  ${styles['bill']}`}>

                <Col sm={4} lg={12} className='w-100' >
                    <div className='border'>
                        <h5>TỔNG ĐƠN HÀNG| {props.total} SẢN PHẨM</h5>
                        <p className='text-danger'>Tổng giá (các) sản phẩm: {props.price} VNĐ</p>
                        <h5 className='text-danger'>Tổng: {props.price} VNĐ</h5>
                        <p >Các sản phẩm bạn chọn sẽ được đặt trước trong vòng 30 phút sau khi nhấn nút “Thanh toán”.</p>
                    </div>


                    <div className='w-100 my-3 text-center bg-primary'><Link to='/checkout' className='w-100 text-light  text-decoration-none'>Thanh Toán</Link></div>
                    <div className='w-100 text-center bg-primary'><Link to='/' className='text-light text-decoration-none '>Tiếp Tục Mua Sắm</Link></div>


                </Col>
            </Row>
            </div>
        <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={()=>{
            handleClose();
            if(id_deletecart !== undefined){
                deleteItemCart(id_deletecart);
                
            }
          }}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>


        </div>
    )
}

export default ListCart
