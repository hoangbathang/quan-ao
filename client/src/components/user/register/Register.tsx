import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IFormRegister } from '../../../validation/form';
import styles from './register.module.css';
import backgroundimage from '../../../img/login/background.jpg';
import { RegisterOptions } from '../../../validation/validation';
import { RegisterService } from '../../../service/user/register.service';
import Container from 'typedi';
import { RegisterDTO } from '../../../model/dto/register.dto';
import { STATUS_CODE } from '../../../constants/statuscode';
import { AuthService } from '../../../service/user/auth.service';
const Register = () => {
    const authService = Container.get(AuthService);
    const navigate = useNavigate();
    const checkisSignIn = async ()=>{
        if(await authService.isSignedIn()){
            navigate('/login')
        }
    }
    useEffect(  () => {
        checkisSignIn();
    }, []);
    const registerService = Container.get(RegisterService);
    const [message,setmessage] = useState<string>();
    const { register, formState: { errors }, handleSubmit, getValues } = useForm<IFormRegister>();
    const LoginSubmit = (data: IFormRegister) => {  
        const {email,password} = data;
        const registerDTO = new RegisterDTO({ agentCode: '/account/register'},{
            email,
            password
        });
        registerService.register(registerDTO).then((result)=>{
                setmessage(result.data?.message);
                if(typeof result.data === 'string' && result.status === STATUS_CODE.ERROR){
                    setmessage(result.data);
                }    
        })

    };
  return (
    <Row className={`${styles['container']}`}>
                <Col className='col-sm-12 col-md-6 col-lg-6  '>
                    <Card.Img src={backgroundimage}></Card.Img>
                </Col>
                <Col className=' col-sm-12 col-md-6 col-lg-6 '>
                    <Form onSubmit={handleSubmit(LoginSubmit)}>
                        <h3 className='text-center my-3'>Đăng Ký</h3>
                        <Form.Group className='d-flex my-3'>
                            <Form.Label className='w-50'>Địa chỉ Email</Form.Label>
                            <Form.Control {...register('email', RegisterOptions.email)}
                                type="string" placeholder="Địa Chỉ Email" />
                            
                        </Form.Group>
                        {errors.email && <p className='text-warning'>{errors.email.message}</p>}
                        <Form.Group className='d-flex my-3'>
                            <Form.Label className='w-50'>Mật Khẩu</Form.Label>
                            <Form.Control {...register('password', RegisterOptions.password)}
                                type="password" placeholder="Mật Khẩu" />
                        </Form.Group>
                        {errors.password && <p className='text-warning'>{errors.password.message}</p>}
                        <Form.Group className='d-flex my-3'>
                            <Form.Label className='w-50'>Nhập lại mật khẩu</Form.Label>
                            <Form.Control {...register('verify_password',{ required: 'Bạn chưa nhập lại mật khẩu',
                             validate : (value) => value === getValues('password') || 'Mật khẩu không khớp' } )}
                                type="password" placeholder="Mật Khẩu" />
                        </Form.Group>
                        {errors.verify_password && <p className='text-warning'>{errors.verify_password.message}</p>}
                        <Form.Group className='text-center'>
                            <Button className='w-50' variant="primary" type="submit">
                                Đăng Ký
                            </Button>
                        </Form.Group>
                        <p className='text-warning text-center mt-2'>{message}</p>
                        <Form.Group>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Bạn đã có tài khoản? <Link to='/login'
                                className="link-danger">Đăng Nhập</Link></p>
                        </Form.Group>
                    </Form>
                </Col>

            </Row>
  )
}

export default Register
