import { ACTION_GET } from '../constants/action';

import { IProduct } from '../model/PublichHomeProduct';

export const addproduct = (data: IProduct) => {
  return {
    type: ACTION_GET.SHOW_PRODUCTDETAIL,
    data,
  };
};

