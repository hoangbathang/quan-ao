import { ICart, IProductDetail } from './Cart';
import { IProduct } from './PublichHomeProduct';
import { IPublichMenu } from './PublichMenu';
import { IUser } from './user';

export interface actionMenu {
    type: string|undefined,
    data: IPublichMenu[]|undefined
}
export interface actionProduct{
    type: string|undefined,
    data: IProduct|undefined
}
export interface actionCart{
    type: string,
    data: IProductDetail |undefined,
    id: number|undefined,
}
export interface actionUser{
    type: string,
    data: IUser|undefined
}
export interface actionMenuAccount{
    type: string,
    data: boolean,
}
