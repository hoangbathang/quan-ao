import { StatusTypes } from '../constants/bill'

export interface IBill{
    total: number,
    id: number,
    price: number,
    phone: string,
    address: string,
    status: StatusTypes
}
export interface Ipayloadbill{
    firstName: string|undefined,
    lastName: string|undefined,
    phone: string|undefined,
    address: string|undefined,
    price: number|undefined,
    total: number|undefined
}
export interface payloadDetailbill{
    amount: number,
    price: number,
    warehouse: IWareHouseBill

}
export interface IWareHouseBill{
    id_product: number,
    id_size: number,
    id_color: number
}