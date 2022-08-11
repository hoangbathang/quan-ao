import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IProduct } from '../PublichHomeProduct';
import { DTO, ResponseDTO } from './BaseDto';


export interface IGETSearchProductQuery {
    agentCode: string | undefined;
}

export class GetAllSearchProductReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IProduct[] | undefined;
}

export class GetSearchProductDTO extends DTO {
   
    public param: IGETSearchProductQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetAllSearchProductReponse;
    public body: undefined;     
    constructor(param: IGETSearchProductQuery) {
        super();
        this.param = param;
    }
}