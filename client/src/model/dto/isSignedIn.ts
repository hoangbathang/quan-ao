import { ENDPOINT } from '../../constants/endpoint';
import { METHOD } from '../../constants/method';
import { IPublichMenu } from '../PublichMenu';
import { DTO, ResponseDTO } from './BaseDto';
export interface IGETIsSignedInQuery {
    agentCode: string | undefined;
}
export class GetIsSignedInReponse extends ResponseDTO {
    constructor() {
        super();
    }
    public readonly data:  boolean | undefined;
}
export class GetIsSignedInDTO extends DTO {
    public param: IGETIsSignedInQuery;
    public url = ENDPOINT.URL;
    public method = METHOD.GET;
    public readonly response!: GetIsSignedInReponse;
    public body: undefined;     
    constructor(param: IGETIsSignedInQuery) {
        super();
        this.param = param;
    }
}