import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { ICategory } from '../category';
import { DTO, ResponseDTO } from './BaseDto';

export interface IGETCategoryQuery {
    agentCode: string | undefined;
}

export class GetAllCategoryReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  ICategory[] | undefined;
}

export class GetAllCategoryDTO extends DTO {

    public param: IGETCategoryQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetAllCategoryReponse;
    public body: undefined;     
    constructor(param: IGETCategoryQuery) {
        super();
        this.param = param;
    }
}