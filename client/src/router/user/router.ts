
import DetailBill from '../../components/user/bill/DetailBill';
import Infor from '../../components/user/infor/Infor';
import Search from '../../components/user/search/Search';
import { IRoute } from '../../model/Route';
import BillPage from '../../pages/bill/BillPage';
import Cart from '../../pages/cart/Cart';
import CheckoutPage from '../../pages/checkout/CheckoutPage';
import DetailProductPage from '../../pages/detailProduct/DetailProductPage';
import Home from '../../pages/home/Home';
import LoginPage from '../../pages/login/LoginPage';
import RegisterPage from '../../pages/register/RegisterPage';

export const RouterUser: IRoute[]  = [
  {
    url: '/',
    component: Home,
  },
  {
    url: '/product/:id',
    component: DetailProductPage,
  },
  {
    url: '/cart',
    component: Cart,
  },
  {
    url: '/bill',
    component: BillPage,
  },
  {
    url: '/login',
    component: LoginPage,
  },
  {
    url: '/checkout',
    component: CheckoutPage,
  },
  {
    url: '/register',
    component: RegisterPage,
  },
  {
    url: '/bill/:id',
    component: DetailBill,
  },
  {
    url: '/me',
    component: Infor,
  },
  {
    url: '/search/:name',
    component: Search,
  },
];
