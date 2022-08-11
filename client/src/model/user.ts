export interface IUser{
    token: string |undefined,
    user: IInforUser|undefined
}
export interface IInforUser{
    email: string |undefined,
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
}
export enum UserTypes {
    admin = 'admin',
    user = 'user',
  }