import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import styles from './login.module.css';
import backgroundimage from '../../../img/login/background.jpg';
import { useForm } from 'react-hook-form';
import { IFormLogin } from '../../../validation/form';
import { LoginOptions } from '../../../validation/validation';
import { Link, useNavigate } from 'react-router-dom';
import useSignIn from '../../../hooks/sign-in.hook';
import { AuthService } from '../../../service/user/auth.service';
import Container from 'typedi';
const Login = () => {
    const { register, formState: { errors }, handleSubmit, getValues } = useForm<IFormLogin>();
    const authService = Container.get(AuthService);
    const { signIn } = useSignIn();
    const navigate = useNavigate();
    const checkisSignIn = async () => {
        if (await authService.isSignedIn()) {
            navigate('/')
        }
    }
    useEffect(() => {
        checkisSignIn();
    }, []);
    const LoginSubmit = useCallback(
        async () => {
            await signIn(
                getValues('email'),
                getValues('password'),
            );
        },
        [signIn]
    );
    return (
        <Row className={`${styles['container']}`}>
            <Col className='col-sm-12 col-md-4 col-lg-6  '>
                <Card.Img src={backgroundimage}></Card.Img>
            </Col>
            <Col className=' col-sm-12 col-md-8 col-lg-6 '>
                <Form onSubmit={handleSubmit(LoginSubmit)}>
                    <h3 className='text-center my-3'>Đăng Nhập</h3>
                    <Form.Group className='d-flex my-3'>
                        <Form.Label className='w-25'>Địa chỉ Email</Form.Label>
                        <Form.Control {...register('email', LoginOptions.email)}
                            type="string" placeholder="Địa Chỉ Email" />

                    </Form.Group>
                    {errors.email && <p className='text-warning'>{errors.email.message}</p>}
                    <Form.Group className='d-flex my-3'>
                        <Form.Label className='w-25'>Mật Khẩu</Form.Label>
                        <Form.Control {...register('password', LoginOptions.password)}
                            type="password" placeholder="Mật Khẩu" />
                    </Form.Group>
                    {errors.password && <p className='text-warning'>{errors.password.message}</p>}
                    <Form.Group className='text-center'>
                        <Button className='w-50' variant="primary" type="submit">
                            Đăng Nhập
                        </Button>
                    </Form.Group>
                    <Form.Group>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Bạn đã có tài khoản chưa? <Link to='/register'
                            className="link-danger">Đăng Ký</Link></p>
                    </Form.Group>
                </Form>
            </Col>

        </Row>


    )
}

export default Login
