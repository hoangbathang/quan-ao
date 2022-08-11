import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IPublichHomeProduct } from '../PublichHomeProduct';
import { DTO, ResponseDTO } from './BaseDto';

export interface IGETHomeProductQuery {
    agentCode: string | undefined;
}

export class GetAllHomeProductReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IPublichHomeProduct | undefined;
}

export class GetAllHomeProductDTO extends DTO {
   
    public param: IGETHomeProductQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetAllHomeProductReponse;
    public body: undefined;     
    constructor(param: IGETHomeProductQuery) {
        super();
        this.param = param;
    }
}