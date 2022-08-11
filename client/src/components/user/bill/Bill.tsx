import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Container from 'typedi'
import { IBill } from '../../../model/bill'
import { GetBillDTO, IGetBillQuery } from '../../../model/dto/getbill.dto'
import { AuthService } from '../../../service/user/auth.service'
import { BillService } from '../../../service/user/bill.service'

const Bill = () => {
  const authService = Container.get(AuthService);
  const [bill,setbill] = useState<IBill[]>();
  const billService = Container.get(BillService);
  const location = useLocation();
  const getBillQuery:IGetBillQuery ={
    agentCode: location.pathname
  }
  useEffect(()=>{
    billService.getbill( new GetBillDTO(getBillQuery)).then((result)=>{
      if(result.data){
        setbill(result.data);
      }

    })
  },[])
  const renderListBill = (data: IBill[])=>{
    if(data.length > 0){
      return data.map((item,key)=>{
        if(item){
          return (
            <tr key={key}>
             <td><Link to={`/bill/${item.id}`}>{item.id}</Link></td>
             <td>{item.address}</td>
             <td>{item.phone}</td>
             <td> {item.total}</td>
             <td>{item.price}</td>
             <td>{item.status}</td>
             <td><Link to={`/bill/${item.id}`}>Chi tiết</Link></td>
           </tr>
           )
        }
      })
    }

  }
  return (
    <div>
      <h1 className='text-uppercase'>Danh Sách Đơn Hàng</h1>
      <Table striped bordered hover>
      <thead className='bg-success'>
        <tr>
          <th>Mã Đơn hàng</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Tổng sản phẩm</th>
          <th>Đơn giá</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="my-cart-body">
        {bill? renderListBill(bill) : ''}

      </tbody>
    </Table>
    <Row>
      <Col><Link className='text-uppercase' to={'/'}>Tiếp tục mua hàng</Link>
      
      </Col>

    </Row>
    </div>
  )
}

export default Bill
