import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Container from 'typedi';
import Address from '../../components/user/checkout/address/Address';
import Order from '../../components/user/checkout/order/Order';
import { ICart } from '../../model/Cart';
import { IRootState } from '../../reducer/CreateRducer';
import { AuthService } from '../../service/user/auth.service';
import styles from './checkoutpage.module.css';


const CheckoutPage = () => {
  const [IsOrderSubmitDisable,setOrderSubmitDisable] = useState<boolean>(true);
  const navigate = useNavigate();
  const authService = Container.get(AuthService);
  const checkisSignIn = async () => {
    if (!await authService.isSignedIn()) {
      navigate('/login')
    }
  }
  const changeOrderSubmitDisable = (value: boolean)=>{
    setOrderSubmitDisable(value);
  }
  useEffect(() => {
    checkisSignIn();
  }, []);
  const data: ICart | undefined = useSelector((state: IRootState) => {
    if (state.Cart !== undefined) {
      return state.Cart;
    }
  });
  const cart = useMemo(() => data, [data]);

  return (
    <div className={`d-flex ${styles['container']}`}>
      <Address changeOrderSubmitDisable={changeOrderSubmitDisable}></Address>

      {cart?.product && cart.price && cart.total ? <Order IsOrderSubmitDisable={IsOrderSubmitDisable} price={cart.price} product={cart.product} total={cart.total} ></Order> : <h1>Giỏ hàng trống không thể đặt hàng</h1>}
    </div>
  )
}

export default CheckoutPage
