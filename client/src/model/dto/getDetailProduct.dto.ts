import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IProduct } from '../PublichHomeProduct';
import { DTO, ResponseDTO } from './BaseDto';

export interface IGETDetailProductQuery {
    agentCode: string | undefined;
}

export class GetDetailProductReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IProduct | undefined;
}

export class GetDetailProductDTO extends DTO {
   
    public param: IGETDetailProductQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetDetailProductReponse;
    public body: undefined;     
    constructor(param: IGETDetailProductQuery) {
        super();
        this.param = param;
    }
}