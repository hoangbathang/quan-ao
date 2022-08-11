import { IProduct } from './PublichHomeProduct';

export interface ICategory{
    id: number,
    name: string,
    menu_url: string,
}
export interface IProductByCategory{
    menu: ICategory[],
    product: IProduct[],
}