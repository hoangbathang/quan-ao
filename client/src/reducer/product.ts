/* eslint-disable camelcase */
import { ACTION_GET } from '../constants/action';
import { actionProduct } from '../model/Action';
import { IProduct } from '../model/PublichHomeProduct';

const Product = (
  state: IProduct = {
    id: undefined,
    category: undefined,
    category_id: undefined,
    colors: [],
    image: [],
    menu: undefined,
    name: undefined,
    price: undefined,
    sizes: [],
    warehouse: []
  },
  action: actionProduct
) => {
  switch (action.type) {
    case ACTION_GET.SHOW_PRODUCTDETAIL:
      return action.data;
    default:
      return state;
  }
};
export default Product;
