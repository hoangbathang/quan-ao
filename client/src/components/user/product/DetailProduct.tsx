/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import styles from './detailproduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../reducer/CreateRducer';
import { ENDPOINT } from '../../../constants/endpoint';
import { URLIMG } from '../../../constants/urlimg';
import { IProduct, IWareHouse } from '../../../model/PublichHomeProduct';
import { IProductDetail } from '../../../model/Cart';
import { json } from 'stream/consumers';
import * as action from '../../../action/cart.action';

const DetailProduct = () => {
    const data: IProduct | undefined = useSelector((state: IRootState) => {
        if (state.Product !== undefined) {
            return state.Product;
        }
    });
    const [message, setmessage] = useState<string>('');
    const [changewarehouse, setchangewarehouse] = useState<boolean>(false);
    const product = useMemo(() => data, [data]);
    const [amout, setamount] = useState<number>(0);
    const Dispatch = useDispatch();
    const [warehouse, setwarehouse] = useState<IProductDetail>({
        id_color: 0,
        id_size: 0,
        amount: 0,
        id_product: 0,
        price: 0,
        price_product: 0,
        name: '',
        name_color: '',
        name_size: '',
        url_image: '',
    });
    useEffect(() => {
        if (product?.image && product?.image[0].url) {
            const newvalue = {
                price_product: parseInt(`${product?.price}`),
                name: product?.name,
                url_image: product?.image[0].url,
            };
            const newwarehous = Object.assign(warehouse, newvalue);
            setwarehouse(newwarehous);

        }
    }, [product]);
    const SetValueOnchange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newvalue = { [name]: parseInt(value) };
        let newwarehous = Object.assign(warehouse, newvalue);
        if (name === 'amount' && product?.price) {
            const newprice = { price: product.price * parseInt(value) }
            newwarehous = Object.assign(newwarehous, newprice);
        }
        if (name === 'id_color') {
            const namecolor = product?.colors?.find(item => item.id === parseInt(value))?.name;
            const objectnamecolor = { name_color: namecolor }
            newwarehous = Object.assign(newwarehous, objectnamecolor);
        }
        if (name === 'id_size') {
            const namesize = product?.sizes?.find(item => item.id === parseInt(value))?.name;
            const objectnamesize = { name_size: namesize }
            newwarehous = Object.assign(newwarehous, objectnamesize);
        }
        setwarehouse(newwarehous);
        setchangewarehouse(!changewarehouse);
    }
    const getandsetamount = (warehouses: IWareHouse[]) => {
        const checkwarehouse = warehouses.find((item) => {
            return item.id_color === warehouse.id_color && item.id_size === warehouse.id_size;
        });
        if (checkwarehouse && product) {
            setamount(checkwarehouse.amount);
            setmessage('');
        }
        if (!checkwarehouse && warehouse.id_color !== 0 && warehouse.id_size !== 0) {
            setamount(0);
            setmessage('Mời chọn màu sắc hoặc kích thước khác');
            const new_warehouse = Object.assign(warehouse, {
                amount: 0
            });
            setwarehouse(new_warehouse);
        }
    }
    useEffect(() => {
        if (product?.warehouse) {
            getandsetamount(product?.warehouse);
        }
    }, [changewarehouse])
    useEffect(() => {
        setmessage('');
        if (product) {
            const newvalue = { id_product: product.id };
            const newwarehous = Object.assign(warehouse, newvalue);
            setwarehouse(newwarehous);
        }
    }, [])
    const renderAmount = (amount: number) => {
        const arrayoption = [];
        if (amount > 0) {
            for (let i = 1; i <= amount; i++) {
                const item = <option key={i} value={i}>{i}</option>;
                arrayoption.push(item);
            }
            return arrayoption;
        }
        else {
            return '';
        }
    }
    const addCart = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { amount, id_color, id_size } = warehouse;
        if (amount === 0) {
            setmessage('Bạn chưa nhập số lượng');
        }
        if (id_color === 0) {
            setmessage('Bạn chưa chọn màu sắc');
        }
        if (id_size === 0) {
            setmessage('Bạn chưa chọn kích cỡ');
        }
        if (amount != 0 && id_color !== 0 && id_size !== 0) {
            Dispatch(action.addCart(warehouse));

        }

    }
    return (
        <div>
            <Row>
                <Col lg={6}>
                    {product?.image !== undefined && product?.image[0] !== undefined ? <Card.Img src={`${ENDPOINT.URL}/${URLIMG.PRODUCT}${product?.image[0].url}`}>
                    </Card.Img> : ''}
                </Col>
                <Col lg={6} className='d-flex flex-column align-items-center'>
                    <Form onSubmit={addCart}>
                        <h1>{product?.name}</h1>
                        <h2>{product?.price} VNĐ</h2>
                        <p>{product?.name}</p>
                        <p>Màu Sắc</p>
                        <div className={' d-flex '}>
                            {product?.colors?.map((color, key) => {
                                return (
                                    <div className='h-25' key={key}>
                                        <Card.Img src={`${ENDPOINT.URL}/${URLIMG.COLOR}${color.url}`} className={`${styles['color-product']} h-50 w-50 img-fluid`}>
                                        </Card.Img>
                                        <Form.Check
                                            onChange={SetValueOnchange}
                                            className='text-uppercase'
                                            inline
                                            label={`${color.name}`}
                                            name='id_color'
                                            type='radio'
                                            value={color.id}
                                        />
                                    </div>

                                )
                            })}

                        </div>
                        <p className='mt-2'>Kích cỡ</p>
                        {product?.sizes ? product?.sizes.map((item, key) => {
                            return (
                                <Form.Check key={key}
                                    inline
                                    label={`${item.name}`}
                                    name='id_size'
                                    type='radio'
                                    value={item.id}
                                    className='text-uppercase'
                                    onChange={SetValueOnchange}
                                />
                            )
                        }) : ''}

                        <Form.Select onChange={SetValueOnchange} name='amount' className='w-50 mt-3'>
                            <option value={0}>Số Lượng</option>
                            {renderAmount(amout)}
                        </Form.Select>
                        <p className='text-warning mt-2'>{message}</p>
                        <p className='text-success'>Giá: {product?.price ? product.price * warehouse.amount : ''} VNĐ </p>
                        <Button type='submit' variant="danger" className='w-100 mt-3'>Thêm Vào Giỏ Hàng</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default DetailProduct
