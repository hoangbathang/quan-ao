import Container, { Service } from 'typedi';
import { ADDBILLDTO, IADDBILLResponseDTO } from '../../model/dto/addBill.dto';
import { GetBillDTO, GetBillResponseDTO } from '../../model/dto/getbill.dto';
import {
  GetDetailBillDTO,
  GetDetailBillResponseDTO,
} from '../../model/dto/getDetailBill.dto';
import { AuthService } from './auth.service';

@Service()
export class BillService {
  private httpServiceInstance = Container.get(AuthService);
  async addbill(addBillDTO: ADDBILLDTO): Promise<IADDBILLResponseDTO> {
    return this.httpServiceInstance.request(addBillDTO);
  }
  async getbill(getBillDto: GetBillDTO): Promise<GetBillResponseDTO> {
    return this.httpServiceInstance.request(getBillDto);
  }
  async getdetailbill(
    getDetailBillDto: GetDetailBillDTO
  ): Promise<GetDetailBillResponseDTO> {
    return this.httpServiceInstance.request(getDetailBillDto);
  }
}
