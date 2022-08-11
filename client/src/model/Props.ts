import { IProductDetail } from './Cart';

export interface IpropsCart{
    data: IProductDetail[],
    price: number,
    total: number,
}