import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Table } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from 'typedi';
import { ENDPOINT } from '../../../constants/endpoint';
import { URLIMG } from '../../../constants/urlimg';
import { GetDetailBillDTO, IGetDetailBillQuery } from '../../../model/dto/getDetailBill.dto';
import { IDetailBill } from '../../../model/gedetailbill';
import { AuthService } from '../../../service/user/auth.service';
import { BillService } from '../../../service/user/bill.service';
import styles from './detailproduct.module.css';

const DetailBill = () => {
  const navigate = useNavigate();
  const authService = Container.get(AuthService);
  const checkisSignIn = async () => {
    if (!await authService.isSignedIn()) {
      navigate('/login')
    }
  }
  useEffect(() => {
    checkisSignIn();
  }, []);
  const [bill, setbill] = useState<IDetailBill[]>();
  const billService = Container.get(BillService);
  const location = useLocation();
  const getDetailBillQuery: IGetDetailBillQuery = {
    agentCode: location.pathname
  }
  useEffect(() => {
    billService.getdetailbill(new GetDetailBillDTO(getDetailBillQuery)).then((result) => {
      if (result.data) {
        setbill(result.data);
      }

    })
  }, [])
  const renderListBill = (data: IDetailBill[]) => {
    if (data.length > 0) {
      return data.map((item, key) => {
        if (item) {
          return (
            <tr key={key}>
              <td>{item.name_product}</td>
              <td><Link to={`/product/${item.id_product}`}><Card.Img className={`${styles['img-product']}`} src={`${ENDPOINT.URL}/${URLIMG.PRODUCT}${item.url_product}`}></Card.Img></Link></td>
              <td>{item.amount}</td>
              <td>{item.price_product}</td>
              <td>{item.price}</td>
              <td>{item.name_size}</td>
              <td><Card.Img className={`${styles['img-color']}`} src={`${ENDPOINT.URL}/${URLIMG.COLOR}${item.url_color}`}></Card.Img></td>
              
            </tr>
          )
        }
      })
    }

  }
  return (
    <div>
      <h1 className='text-uppercase'>Chi Tiết Đơn Hàng</h1>
      <Table striped bordered hover>
        <thead className='bg-success'>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Ảnh</th>
            <th>Số lượng</th>
            <th>Giá sản phẩm</th>
            <th>Đơn giá</th>
            <th>Kích thước</th>
            <th>Màu sắc</th>
          </tr>
        </thead>
        <tbody id="my-cart-body">
          {bill ? renderListBill(bill) : ''}

        </tbody>
      </Table>
      <Row >
        <Col className='d-flex justify-content-between'><Link className='text-uppercase' to={'/'}>Tiếp tục mua hàng</Link>
        <Link className='text-uppercase' to={'/bill'}>Hóa đơn</Link></Col>
        

      </Row>
    </div>
  )
}

export default DetailBill
