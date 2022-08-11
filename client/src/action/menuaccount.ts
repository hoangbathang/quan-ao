import { ACTION_GET } from '../constants/action';

export const displayMenu = (data :boolean)=>{
    return {
        type : ACTION_GET.DISPLAY_MENU_ACCOUNT,     
        data
    }
};