import Container, { Service } from 'typedi';
import { RegisterDTO, RegisterReponse } from '../../model/dto/register.dto';
import { HttpService } from './http.service';

@Service()
export class RegisterService {
    private httpServiceInstance = Container.get(HttpService);
    async register(registerDTO: RegisterDTO): Promise<RegisterReponse> {
        return this.httpServiceInstance.request(registerDTO);
    }

}