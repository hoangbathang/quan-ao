import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IBodyRegister, IReponseRegister } from '../PublichRegister';
import { DTO, ResponseDTO } from './BaseDto';

export interface IRegisterQuery {
    agentCode: string | undefined;
}

export class RegisterReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IReponseRegister |undefined;
}

export class RegisterDTO extends DTO {
   
    public param: IRegisterQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.POST;
    public readonly response!: RegisterReponse ;
    public body: IBodyRegister;     
    constructor(param: IRegisterQuery, body: IBodyRegister) {
        super();
        this.param = param;
        this.body= body;
    }
}