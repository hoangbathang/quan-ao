import { ACTION_GET } from '../constants/action';
import { actionMenuAccount } from '../model/Action';

const MenuAccount  = (state = false, action:actionMenuAccount) => {
    switch (action.type) {
        case ACTION_GET.DISPLAY_MENU_ACCOUNT:
            return action.data;
        default:
            return state;
    }

}
export default MenuAccount;