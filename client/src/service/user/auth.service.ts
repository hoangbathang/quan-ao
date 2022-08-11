import { observable, runInAction } from 'mobx';
import Container, { Service } from 'typedi';
import { STATUS_CODE } from '../../constants/statuscode';
import { GetIsSignedInDTO } from '../../model/dto/isSignedIn';
import { ILoginResponseDTO, LoginDTO } from '../../model/dto/login.dto';
import { IInforUser } from '../../model/user';
import { HttpService } from './http.service';
import jwtDecode from 'jwt-decode';
import { DTO, ResponseDTO } from '../../model/dto/BaseDto';
import axios from 'axios';

@Service()
export class AuthService {
  private httpService = Container.get(HttpService);
  @observable
  public token?: string | null = localStorage.getItem('token');
  public user?: IInforUser = JSON.parse(localStorage.getItem('user')|| JSON.stringify({
    address:undefined,
    email: undefined,
    firstName: undefined,
    lastName : undefined,
    phone: undefined
  }) );
  async signIn(loginDTO: LoginDTO): Promise<ILoginResponseDTO> {
    const data = await this.httpService.request(loginDTO);
    if (data.data.token) {
      this.token = data.data?.token;
      localStorage.setItem('token', data.data?.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      runInAction(
        () =>
          (this.user = {
            email: data.data.user.email,
            address: data.data.user.address,
            firstName: data.data.user.firstName,
            lastName: data.data.user.lastName,
            phone: data.data.user.phone,
          })
      );
      runInAction(() => (this.token = data.data.token));
    }
    return data;
  }
  async setUser(data: IInforUser) {
    runInAction(
      () =>
        (this.user = {
          email: data.email,
          address: data.address,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
        })
    );
  }
  async logOut(){
    this.token = undefined;
    this.user = undefined;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  async isSignedIn() {
    const tokenContent = this.getTokenInfo();
    return (
      !!this.user &&
      !!tokenContent &&
      tokenContent.exp * 1000 > new Date().getTime()
    );
  }
  getTokenInfo(): { exp: number } | undefined {
    return this.token ? jwtDecode(this.token) : undefined;
  }
  getToken(){
    return this.token;
  }
  public request = async (data: DTO): Promise<ResponseDTO> => {
    try {
      const response = await axios({
        headers: { Authorization: `Bearer ${this.token}` },
        method: data.method,
        url: `${data.url}${data.param?.agentCode}`,
        data: data.body,
      });
      return { data: response.data, status: STATUS_CODE.SUCCESS };
    } catch (errorResponse: any) {

      return {
        data: { message: errorResponse.data },
        status: STATUS_CODE.ERROR,
      };
    }
  };
}
