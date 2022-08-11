import { ICategory } from './category'

export interface IPublichHomeProduct{
    products_new:IProduct[],
    toppick_product: IToppickproduct[],
}
export interface IToppickproduct{
    id_product: number,
    id_color: number,
    id_size: number,
    name: string,
    color_url: number,
    img_url: string,
    name_menu: string,
    name_size: string,
    price: number,
}
export interface IProduct{
    id: number| undefined,
    name: string| undefined,
    price: number| undefined,
    category_id: number| undefined,
    image: IImage[]| undefined,
    category: ICategory| undefined,
    colors: IColor[]| undefined,
    sizes: ISize[]| undefined,
    menu: IMenu| undefined,
    warehouse: IWareHouse[],

}
export interface IWareHouse{
        id: number,
        id_product: number,
        id_size: number,
        id_color: number,
        amount: number,
        size: ISize,
        color: IColor
}
export interface IMenu{
    id: number,
    name: string,
    url: string
}


export interface IImage{
    url: string,
}
export interface ISize{
    id: number,
    name: string,
}
export interface IColor{
    id: number,
    name: string,
    url: string,
}