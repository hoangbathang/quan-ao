import { ACTION_GET } from '../constants/action';
import { ICart, IProductDetail } from '../model/Cart';
import { actionCart } from '../model/Action';
export const addCart = (data :IProductDetail)=>{
    return {
        type : ACTION_GET.ADD_CART,     
        data
    }
};
export const RemoveCart = ()=>{
  return {
      type : ACTION_GET.REMOVE_CART
  }
};
export const deleteItemCart = (id: number): actionCart => {
    return {
      type: ACTION_GET.DELETE_CART,
      data: undefined,
      id,
    };
  };
