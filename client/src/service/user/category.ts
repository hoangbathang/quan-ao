import Container, { Service } from 'typedi';
import { GetAllCategoryDTO, GetAllCategoryReponse } from '../../model/dto/getCategory';
import { GetAllProductCategoryReponse, GetProductCategoryDTO } from '../../model/dto/getproductcateogry';
import { HttpService } from './http.service';

@Service()
export class CategoryService {
    private httpServiceInstance = Container.get(HttpService);
    async showcategory(getAllCategoryDTO: GetAllCategoryDTO): Promise<GetAllCategoryReponse> {
        return this.httpServiceInstance.request(getAllCategoryDTO);
    }
    async showproduct(getProductCategory: GetProductCategoryDTO) : Promise<GetAllProductCategoryReponse>{
        return this.httpServiceInstance.request(getProductCategory);
    }

}
