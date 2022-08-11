/* eslint-disable @typescript-eslint/no-empty-function */
import { Service } from 'typedi';
import axios from 'axios';
import { DTO, ResponseDTO } from '../../model/dto/BaseDto';
import { STATUS_CODE } from '../../constants/statuscode';
@Service()
export class HttpService {
  constructor() {}
  public request = async (data: DTO): Promise<ResponseDTO> => {
    try {
      const response = await axios({
        method: data.method,
        url: `${data.url}${data.param?.agentCode}`,
        data: data.body,
      });
      

      return { data: response.data, status: STATUS_CODE.SUCCESS };
    } catch (errorResponse: any) {
      return { data: errorResponse.response.data.message, status: STATUS_CODE.ERROR };
    }
  };
}
