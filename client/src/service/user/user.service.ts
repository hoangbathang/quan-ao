import Container, { Service } from 'typedi';
import { UpdateInforUserDTO, UpdateInforUserReponse } from '../../model/dto/updateInforUser.dto';
import { AuthService } from './auth.service';


@Service()
export class UserService {
    private httpServiceInstance = Container.get(AuthService);
    async updateInforUser(updateInforUser: UpdateInforUserDTO): Promise<UpdateInforUserReponse> {
        return this.httpServiceInstance.request(updateInforUser);
    }

}