import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IDetailBill } from '../gedetailbill';
import { DTO, ResponseDTO } from './BaseDto';


export interface IGetDetailBillQuery {
    agentCode: string | undefined;
}


export class GetDetailBillResponseDTO extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IDetailBill[] |undefined;
}

export class GetDetailBillDTO extends DTO {
   
    public param: IGetDetailBillQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetDetailBillResponseDTO ;
    public body: undefined;     
    constructor(param: IGetDetailBillQuery) {
        super();
        this.param = param;
    }
}