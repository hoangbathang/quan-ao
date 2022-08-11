import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IBill } from '../bill';
import { DTO, ResponseDTO } from './BaseDto';

export interface IGetBillQuery {
    agentCode: string | undefined;
}


export class GetBillResponseDTO extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IBill[] |undefined;
}

export class GetBillDTO extends DTO {
   
    public param: IGetBillQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetBillResponseDTO ;
    public body: undefined;     
    constructor(param: IGetBillQuery) {
        super();
        this.param = param;
    }
}