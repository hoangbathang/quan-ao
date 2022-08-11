import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IPublichMenu } from '../PublichMenu';
import { IInforUser } from '../user';
import { DTO, ResponseDTO } from './BaseDto';
export interface IUpdateInforQuery {
    agentCode: string | undefined;
}


export class UpdateInforUserReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IInforUser | undefined;
}

export class UpdateInforUserDTO extends DTO {
    public param: IUpdateInforQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.POST;
    public readonly response!: UpdateInforUserReponse;
    public body: IInforUser;     
    constructor(param: IUpdateInforQuery, body:IInforUser) {
        super();
        this.param = param;
        this.body = body;
        
    }
}