import {combineReducers} from 'redux';
import Menu from './menu';
import Product from './product';
import Cart from './Cart';
import MenuAccount from './menuaccount';
const reducers = combineReducers({
    Menu,
    Product,
    Cart,
    MenuAccount
})
export default  reducers;
export type IRootState = ReturnType<typeof reducers>;