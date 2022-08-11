import { ACTION_GET } from '../constants/action';
import { IPublichMenu } from '../model/PublichMenu';

export const addmenu = (data :IPublichMenu[])=>{
    return {
        type : ACTION_GET.SHOW_MENU,     
        data
    }
};





