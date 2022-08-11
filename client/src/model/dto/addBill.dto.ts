import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IBill, Ipayloadbill, payloadDetailbill } from '../bill';
import { IUser } from '../user';
import { DTO, ResponseDTO } from './BaseDto';

export interface IADDBILLQuery {
    agentCode: string | undefined;
}

export interface IADDBillDTO{
    payloadbill: Ipayloadbill,
    payloadDetailbill: payloadDetailbill[],
}

export class IADDBILLResponseDTO extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IBill |undefined;
}

export class ADDBILLDTO extends DTO {
   
    public param: IADDBILLQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.POST;
    public readonly response!: IADDBILLResponseDTO ;
    public body: IADDBillDTO;     
    constructor(param: IADDBILLQuery, body: IADDBillDTO) {
        super();
        this.param = param;
        this.body= body;
    }
}