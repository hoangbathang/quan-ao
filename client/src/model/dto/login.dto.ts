import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IUser } from '../user';
import { DTO, ResponseDTO } from './BaseDto';

export interface ILoginQuery {
    agentCode: string | undefined;
}

export interface ILoginDTO{
    email: string,
    password: string,
}

export class ILoginResponseDTO extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IUser |undefined;
}

export class LoginDTO extends DTO {
   
    public param: ILoginQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.POST;
    public readonly response!: ILoginResponseDTO ;
    public body: ILoginDTO;     
    constructor(param: ILoginQuery, body: ILoginDTO) {
        super();
        this.param = param;
        this.body= body;
    }
}