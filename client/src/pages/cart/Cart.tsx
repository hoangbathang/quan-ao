import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import ListCart from '../../components/user/cart/ListCart'
import { ICart } from '../../model/Cart'
import { IRootState } from '../../reducer/CreateRducer';

const Cart = () => {
  const data: ICart | undefined = useSelector((state: IRootState) => {
    if (state.Product !== undefined) {
        return state.Cart;
    }
});
const cart = useMemo(() => data, [data]);

  return (
    <div>
      {cart?.product &&cart.price &&cart.total ? <ListCart  price={cart.price} total={cart.total} data={cart.product}></ListCart> : <h1 className='text-uppercase text-center'>Giỏ hàng trống</h1>  }
    </div>
  )
}

export default Cart
