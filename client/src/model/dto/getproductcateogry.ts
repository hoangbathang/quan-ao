import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IProductByCategory } from '../category';
import { IProduct } from '../PublichHomeProduct';
import { DTO, ResponseDTO } from './BaseDto';


export interface IGETProductCategoryQuery {
    agentCode: string | undefined;
}

export class GetAllProductCategoryReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IProductByCategory | undefined;
}

export class GetProductCategoryDTO extends DTO {
   
    public param: IGETProductCategoryQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetAllProductCategoryReponse;
    public body: undefined;     
    constructor(param: IGETProductCategoryQuery) {
        super();
        this.param = param;
    }
}