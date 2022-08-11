import Container, { Service } from 'typedi';
import { GetDetailProductDTO, GetDetailProductReponse } from '../../model/dto/getDetailProduct.dto';
import { HttpService } from './http.service';

@Service()
export class DetailProductService {
    private httpServiceInstance = Container.get(HttpService);
    async showproduct(GetDetailProductDTO: GetDetailProductDTO): Promise<GetDetailProductReponse> {
        return this.httpServiceInstance.request(GetDetailProductDTO);
    }

}