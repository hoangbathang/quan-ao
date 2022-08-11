import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, Navbar, Nav, Form, Button, Badge, DropdownButton, Dropdown } from 'react-bootstrap';
import { TbHeadphones } from 'react-icons/tb';
import { AiOutlineMail } from 'react-icons/ai';
import { BsCart, BsPersonCircle, BsSearch } from 'react-icons/bs';
import logo from '../../../logos/logo.png';
import styles from './header.module.css';
import { MenuService } from '../../../service/user/menu.service';
import Container from 'typedi';
import { IPublichMenu } from '../../../model/PublichMenu';
import { GetAllMenuDTO } from '../../../model/dto/getMenu.dto';
import { Link, useNavigate } from 'react-router-dom';
import { ICart } from '../../../model/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../reducer/CreateRducer';
import { AuthService } from '../../../service/user/auth.service';
import * as action from '../../../action/menuaccount';
import * as actionMenu from '../../../action/menu.action';
import { useForm } from 'react-hook-form';
import { IFormSearch } from '../../../validation/form';
import { message } from 'antd';

const Header = () => {
    const checkisSignIn = async () => {
        if (await authService.isSignedIn()) {
            Dispatch(action.displayMenu(true));
        }
    }
    useEffect(() => {
        checkisSignIn();
    }, []);
    const submitSearch = (data: IFormSearch) => {
        const { value } = data;
        naviagate(`/search/${value}`)
    }
    const { register, formState: { errors }, handleSubmit, getValues } = useForm<IFormSearch>();
    const Dispatch = useDispatch();
    const authService = Container.get(AuthService);
    const [MenuAccount, setMenuAccount] = useState<boolean>(false);
    const IsMenuAcount = useSelector((state: IRootState) => {
        if (state.MenuAccount !== undefined) {
            return state.MenuAccount;
        }
    });
    useMemo(() => {
        if (IsMenuAcount !== undefined) {
            setMenuAccount(IsMenuAcount);
        }
    }, [IsMenuAcount])


    const cartReducer: ICart | undefined = useSelector((state: IRootState) => {
        if (state.Cart !== undefined) {
            return state.Cart;
        }
    });

    useEffect(() => {

        if (cartReducer?.total) {
            setquantityCart(cartReducer.total);
        } else {
            setquantityCart(0);
        }

    }, [cartReducer]);


    const menuService = Container.get(MenuService);
    const [menu, setmenu] = useState<IPublichMenu[]>([]);
    // const match  = {params: useParams()};
    // const { id } = useParams(); 
    const getAllMenuDTO = new GetAllMenuDTO({ agentCode: '/menu' });
    const [quantityCart, setquantityCart] = useState<number>(0);
    const [menuStyle, setmenuStyle] = useState<string>('');
    const [open, setopen] = useState<boolean>(false);
    const [cart, setCart] = useState<ICart>();
    const [styleNavbar, setstyleNavbar] = useState<string>('');
    const naviagate = useNavigate();
    const logout = () => {
        authService.logOut();
        Dispatch(action.displayMenu(false));
        naviagate('/');
        closeNavBar();
    }
    useEffect(() => {
        menuService.showMenu(getAllMenuDTO).then((result) => {
            if (result?.data) {
                Dispatch(actionMenu.addmenu(result.data));
                setmenu(result.data);
            }
        });
        const cartlocal = localStorage.getItem('Cart');
        if (cartlocal) {
            setCart(JSON.parse(cartlocal));
        }
    }, [])
    useEffect(() => {
        if (cart?.total) {
            setquantityCart(cart.total);
        }

    }, [cart])
    const changeStyleMenu = () => {
        setopen(!open);
        if (menuStyle === '') {
            setmenuStyle('menuOnclick');
        }
        else {
            setmenuStyle('');
        }
    }
    const closeNavBar = () => {
        setmenuStyle('');
        if (menuStyle !== '') {
            setopen(!open);
        }
    }
    const paddingNavbar = () => {
        if (!styleNavbar)
            setstyleNavbar('padding-navbar')
        else {
            setstyleNavbar('');
        }


    }
    const renderMenu = (data: IPublichMenu[]) => {
        return data.map((item, index) => {
            return (
                <Link className='text-uppercase text-decoration-none m-2' to={`${item.url}`} onClick={() => {
                    closeNavBar();
                }} key={index}>{item.name}</Link>
            )
        })

    }
    return (

        <Row className={`${styles['nav-bar']} ${styles[styleNavbar]} ${styles[menuStyle]}   `}>
            <Row className={`${styles['top-bar']}  my-2`}>
                <Col >
                    <Card.Text> <TbHeadphones size={30} className='me-2 text-warning' /> 0964049255</Card.Text>
                </Col>
                <Col>
                    <Card.Text> <AiOutlineMail size={30} className='me-2 text-warning' />Thangcntt2306@gmail.com</Card.Text>
                </Col>
            </Row>

            <Row className={`${styles['header']}  `}>
                <Col lg={2} xs={4}>
                    <Link to='/'><Card.Img src={logo} className={` img-fluid  ${styles['logo']}`}></Card.Img></Link>
                </Col>
                <Col className={`${styles['nav-header']}`}>
                    <Navbar collapseOnSelect expand="lg" >
                        <Navbar.Toggle onClick={changeStyleMenu} className={`${styles['menu']} `}></Navbar.Toggle>
                        <Navbar.Collapse in={open} id="responsive-navbar-nav" >
                            <Nav className='w-100'>
                                {renderMenu(menu)}

                            </Nav>
                            <Form onSubmit={handleSubmit(submitSearch)} className={`${styles['form-header']}  d-flex w-100`}>
                                <Form.Control className=' w-75 mx-lg-2 '
                                    type="search"
                                    placeholder="Tìm kiếm theo từ khóa"
                                    aria-label="Search"
                                    {...register('value', {
                                        required: true
                                    })}
                                />





                                <Button variant="primary" className={`${styles['bt-search']}  mx-lg-2`} onClick={closeNavBar} type="submit">
                                    <BsSearch></BsSearch>
                                </Button>
                                {MenuAccount ? <DropdownButton onClick={paddingNavbar} className={`mx-lg-2 me-2 ${styles['dropdown-account']}`} id="dropdown-basic-button" title="Tài Khoản">
                                    <Dropdown.Item ><Link to='/me' onClick={closeNavBar}>Thông tin tài khoản</Link></Dropdown.Item>
                                    <Dropdown.Item ><Link to='/bill' onClick={closeNavBar}>Lịch sử hóa đơn</Link></Dropdown.Item>
                                    <Dropdown.Item ><Button className='w-100' onClick={logout}>Đăng xuất</Button></Dropdown.Item>
                                </DropdownButton> : <Link onClick={closeNavBar} to='login'><BsPersonCircle size={30} className='mx-lg-2'></BsPersonCircle></Link>}


                                <Link onClick={closeNavBar} to='cart' className={`${styles['cart']}`}><BsCart size={30} className='mx-lg-2'></BsCart><Badge bg="secondary" className='h-50'>{quantityCart !== 0 ? quantityCart : ''}</Badge></Link>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Row>
    )
}

export default Header
