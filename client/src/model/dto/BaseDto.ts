import { METHOD } from '../../constants/method';
import { STATUS_CODE } from '../../constants/statuscode';
interface Query {
    agentCode: string | undefined
}
 abstract class DTO {
    public abstract body: object | undefined;
    public abstract readonly url: string|undefined;
    public abstract readonly method: METHOD|undefined;
    public abstract readonly param: Query|undefined;
}

abstract class ResponseDTO {
    public abstract readonly data: any|string;
    public readonly status!: STATUS_CODE;
} 
export {DTO,ResponseDTO};