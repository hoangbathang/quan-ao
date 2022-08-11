import Container, { Service } from 'typedi';
import { GetAllMenuDTO, GetAllMenuReponse } from '../../model/dto/getMenu.dto';
import { HttpService } from './http.service';
@Service()
export class MenuService {
    private httpServiceInstance = Container.get(HttpService);
    async showMenu(GetALLLILICHDTO: GetAllMenuDTO): Promise<GetAllMenuReponse> {
        return this.httpServiceInstance.request(GetALLLILICHDTO);
    }

}

