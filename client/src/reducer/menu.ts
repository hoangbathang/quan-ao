import { ACTION_GET } from '../constants/action';
import { actionMenu } from '../model/Action';
import { IPublichMenu } from '../model/PublichMenu';

const Menu  = (state:IPublichMenu[]|undefined =[{
    name: '',
    url: '',
}], action:actionMenu) => {
    switch (action.type) {
        case ACTION_GET.SHOW_MENU:
            return action.data;
        default:
            return state;
    }

}
export default Menu;