/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import { parse } from 'path';
import { ACTION_GET } from '../constants/action';
import { actionCart } from '../model/Action';
import { ICart } from '../model/Cart';
const carts = localStorage.getItem('Cart');
let initalstate: ICart = {
  price: undefined,
  product: undefined,
  total: undefined,
};
if(carts){
  initalstate = JSON.parse(carts);
}
const Cart = (
  state: ICart = initalstate,
  action: actionCart
) => {
  switch (action.type) {
    case ACTION_GET.ADD_CART:
      const carts = localStorage.getItem('Cart');
      if (action.data) {
        if (!carts) {
          state = {
            price: action.data.price,
            product: [action.data],
            total: 1,
          };
          localStorage.setItem('Cart', JSON.stringify(state));
          return state;
        }

        const Carts: ICart = JSON.parse(carts);
        if (Carts.product) {
          let index = undefined;
          const cartItem = Carts.product.find((item, key) => {
            index = key;
            return (
              item.id_product === action.data?.id_product &&
              item.id_color === action.data.id_color &&
              item.id_size === action.data.id_size
            );
          });

          if (cartItem && index !== undefined) {
            cartItem.amount += action.data.amount;
            cartItem.price += action.data.price;
            Carts.product[index] = cartItem;
            Carts.total = Carts.product.length;
          } else {
            Carts.product.push(action.data);
          }
          const priceCart = Carts.product.reduce(
            (previousValue, currentValue) => {
              return previousValue + currentValue.price;
            },
            0
          );
          Carts.price = priceCart;
          Carts.total = Carts.product.length;
          localStorage.setItem('Cart', JSON.stringify(Carts));
          return Carts;
        }
      }
      return state;
    case ACTION_GET.DELETE_CART:
      const listcart = localStorage.getItem('Cart');
      if (!listcart) {
        return state;
      }
      state = JSON.parse(listcart);
      if (action.id !== undefined) {
        const new_product = state.product?.splice(action.id, 1);
        if (!new_product) {
          return state;
        }
        const priceCart = state.product?.reduce(
          (previousValue, currentValue) => {
            return previousValue + currentValue.price;
          },
          0
        );
        state.price = priceCart;
        state.total = state.product?.length;
        localStorage.setItem('Cart', JSON.stringify(state));
      }
      return state;
      case ACTION_GET.REMOVE_CART:
        localStorage.removeItem('Cart');
        return {
          price: undefined,
          product: undefined,
          total: undefined,
        };

    default:
      return state;
  }
};
export default Cart;
