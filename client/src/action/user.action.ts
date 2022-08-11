import { ACTION_GET } from '../constants/action';
import { IInforUser } from '../model/user';

export const getDetailUser = () => {
    return {
      type: ACTION_GET.GET_DETAIL_USER,
      data: undefined,
    };
  };