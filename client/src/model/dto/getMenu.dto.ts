import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IPublichMenu } from '../PublichMenu';
import { DTO, ResponseDTO } from './BaseDto';
export interface IGETMenuQuery {
    agentCode: string | undefined;
}

export class GetAllMenuReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  IPublichMenu[] | undefined;
}

export class GetAllMenuDTO extends DTO {

    public param: IGETMenuQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetAllMenuReponse;
    public body: undefined;     
    constructor(param: IGETMenuQuery) {
        super();
        this.param = param;
    }
}