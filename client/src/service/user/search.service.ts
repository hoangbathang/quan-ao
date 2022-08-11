import Container, { Service } from 'typedi';
import { GetAllSearchProductReponse, GetSearchProductDTO } from '../../model/dto/SearchProduct';
import { HttpService } from './http.service';

@Service()
export class SearchService {
    private httpServiceInstance = Container.get(HttpService);
    async searchproduct(getSearchProductDTO: GetSearchProductDTO): Promise<GetAllSearchProductReponse> {
        return this.httpServiceInstance.request(getSearchProductDTO);
    }

}