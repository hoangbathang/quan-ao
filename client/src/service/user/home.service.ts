
import Container, { Service } from 'typedi';
import { GetAllHomeProductDTO, GetAllHomeProductReponse } from '../../model/dto/getHomeproduct';
import { HttpService } from './http.service';

@Service()
export class HomeProductService {
    private httpServiceInstance = Container.get(HttpService);
    async showproduct(GetALLHomeProductDTO: GetAllHomeProductDTO): Promise<GetAllHomeProductReponse> {
        return this.httpServiceInstance.request(GetALLHomeProductDTO);
    }

}