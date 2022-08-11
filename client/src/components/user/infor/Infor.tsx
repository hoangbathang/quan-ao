/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Container from 'typedi';
import { AuthService } from '../../../service/user/auth.service';
import Address from '../checkout/address/Address'

const Infor = () => {
    const navigate = useNavigate();
    const authService = Container.get(AuthService);
    const checkisSignIn = async () => {
      if (!await authService.isSignedIn()) {
        navigate('/login')
      }
    }
    useEffect(() => {
      checkisSignIn();
    }, []);
    return (
        <div className='d-flex justify-content-center'>
            <Address changeOrderSubmitDisable={()=>{}}></Address>
        </div>
    )
}

export default Infor
