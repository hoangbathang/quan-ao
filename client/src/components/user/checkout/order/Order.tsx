/* eslint-disable camelcase */
import React, { useMemo, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Container from 'typedi';
import { payloadDetailbill } from '../../../../model/bill';
import { ICart } from '../../../../model/Cart';
import { ADDBILLDTO } from '../../../../model/dto/addBill.dto';
import { AuthService } from '../../../../service/user/auth.service';
import { BillService } from '../../../../service/user/bill.service';
import * as action from '../../../../action/cart.action';
import styles from './order.module.css';
interface Iprops extends ICart {
  IsOrderSubmitDisable: boolean
}
const Order = (props: Iprops) => {
  const billservice = Container.get(BillService);
  const authService = Container.get(AuthService);
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const addBill = (data: ICart) => {
    if (data.product) {
      const datadetailbill: payloadDetailbill[] = [];
      for (let i = 0; i < data.product?.length; i++) {
        datadetailbill.push({
          amount: data.product[i].amount,
          price: data.product[i].price,
          warehouse: {
            id_color: data.product[i].id_color,
            id_product: data.product[i].id_product,
            id_size: data.product[i].id_size,
          }
        })
      }

      const queryAddbill = new ADDBILLDTO({ agentCode: '/bill/add' }, {
        payloadbill: {
          address: authService.user?.address,
          firstName: authService.user?.firstName,
          lastName: authService.user?.lastName,
          phone: authService.user?.phone,
          price: props.price,
          total: props.total
        },
        payloadDetailbill: datadetailbill
      })
      billservice.addbill(queryAddbill).then((result) => {
        Dispatch(action.RemoveCart());
        navigate('/bill')
      });
    }



  }


  return (
    <Row className={` ps-2 my-2 ${styles['bill']}`}>

      <Col sm={4} lg={12} className='w-100' >
        <div className=''>
          <h1>Tóm tắt đơn hàng</h1>
          <h5 className='text-danger'>Tổng các sản phẩm: {props.total}</h5>
          <h3 className='text-danger'>Tổng: {props.price} VND</h3>
          <p >Khách hàng sẽ nhận hàng sau 3-5 ngày kể từ khi đặt mua sản phẩm.</p>
        </div>


        <Button className='my-3 me-3' onClick={() => {
          addBill(props);
        }} disabled={props.IsOrderSubmitDisable} >Đặt Hàng </Button>
        <Button className='m-3'><Link to='/' className='text-light text-decoration-none'>Tiếp Tục Mua Sắm</Link></Button>


      </Col>
    </Row>
  )
}

export default Order
