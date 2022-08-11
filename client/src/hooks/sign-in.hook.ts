import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'typedi';
import { LoginDTO } from '../model/dto/login.dto';
import { AuthService } from '../service/user/auth.service';
import { message, Result } from 'antd';
import { STATUS_CODE } from '../constants/statuscode';
import { useDispatch } from 'react-redux';
import * as action from '../action/menuaccount';

const useSignIn = () => {
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const signIn = useCallback(async (email: string, password: string) => {
        try {
            const auth = Container.get(AuthService);
            const loginDTO = new LoginDTO({agentCode: '/auth/login'},{ email, password });
            const loginInfo = await auth.signIn(loginDTO);
            if (loginInfo.status === STATUS_CODE.SUCCESS) {
                Dispatch(action.displayMenu(true));
                navigate(-1);
            }
            if(loginInfo.status === STATUS_CODE.ERROR){
                
                message.error({
                    content: `${loginInfo.data}`,
                    duration: 0.2,
                    className: 'custom-class',
                    style: {
                      marginTop: '30vh',
                      marginLeft: '40vw'
                    },
                  });
            }
        } catch (error) {
            message.error('Sai email hoặc mật khẩu');
        }
    }, []);
    return { signIn };
};
export default useSignIn;