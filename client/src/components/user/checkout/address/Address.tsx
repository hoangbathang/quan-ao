import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AddressOptions } from '../../../../validation/validation';
import styles from './address.module.css';
import * as action from '../../../../action/user.action';
import Container from 'typedi';
import { AuthService } from '../../../../service/user/auth.service';
import { IInforUser } from '../../../../model/user';
import { UpdateInforUserDTO } from '../../../../model/dto/updateInforUser.dto';
import { UserService } from '../../../../service/user/user.service';
interface Iprops {
  changeOrderSubmitDisable: (id: boolean) => void 
}
const Address = (props: Iprops) => {
  const [userInfor, setUserInfor] = useState<IInforUser>();
  const authService = Container.get(AuthService);

  const updateInforUser = Container.get(UserService);
  const { register, formState: { errors }, handleSubmit, reset } = useForm<IInforUser>();
  const onSubmit = (data: IInforUser) => {
    const { address, email, firstName, lastName, phone } = data;
    updateInforUser.updateInforUser(new UpdateInforUserDTO({
      agentCode: '/account/update'
    }, {
      address,
      email,
      firstName,
      lastName,
      phone,
    })).then((result) => {
      props.changeOrderSubmitDisable(false);
      if(result.data){
        authService.setUser(result.data);
      }
      localStorage.setItem('user', JSON.stringify(result.data));
    })

  };
  useEffect(() => {
    setUserInfor(authService.user);
  }, [])
  useEffect(() => {
    reset(userInfor);

  }, [userInfor])
  return (

    <Row className={` ${styles['address']}`}>
      <h1>Địa chỉ giao hàng</h1>

      <Col>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className='my-2'>
            <Col className='col-3'>
              <Form.Label className=''>Họ</Form.Label>
            </Col>
            <Col className='d-flex justify-content-between '>
              <div>
                <Form.Control    {...register('firstName', AddressOptions.firstName)} type="text" placeholder="Họ" />
                {errors.firstName && <p className='text-warning'>{errors.firstName.message}</p>}
              </div>
              <Form.Label className=' ps-2 '>Tên</Form.Label>
              <div>
                <Form.Control  {...register('lastName', AddressOptions.lastName)}
                  type="text" placeholder="Tên" />
                {errors?.lastName && <p className='text-warning'>{errors.lastName.message}</p>}
              </div>
            </Col>

          </Row>
          <Row className='my-2'>
            <Col className='col-3'>
              <Form.Label className='m-auto'>Số điện thoại</Form.Label>
            </Col>
            <Col>
              <Form.Control   {...register('phone', AddressOptions.phone)}
                type="string" placeholder="Số điện thoại" />
              {errors?.phone && <p className='text-warning'>{errors.phone.message}</p>}
            </Col>

          </Row>
          <Row className='my-2'>
            <Col className='col-3'>
              <Form.Label className='m-auto'>Địa chỉ</Form.Label>
            </Col>
            <Col>
              <Form.Control   {...register('address', AddressOptions.address)}
                type="text" placeholder="Địa chỉ" />
              {errors?.address && <p className='text-warning'>{errors.address.message}</p>}
            </Col>

          </Row>

          <Row className='d-flex justify-content-center'>
            <Button type='submit' className='w-25'>Lưu</Button>
          </Row>
        </Form>
      </Col>
    </Row>

  )
}

export default Address
