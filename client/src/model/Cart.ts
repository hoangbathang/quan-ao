export interface IProductDetail {
    id_size: number,
    id_color: number,
    amount: number,
    id_product: number,
    price: number,
    price_product: number,
    name: string, 
    name_color: string,
    name_size: string,
    url_image: string,
}
export interface ICart{
    product: IProductDetail[] | undefined,
    price: number | undefined,
    total: number| undefined,
}