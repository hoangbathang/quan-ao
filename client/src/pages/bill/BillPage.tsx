import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Container from 'typedi';
import Bill from '../../components/user/bill/Bill';
import { AuthService } from '../../service/user/auth.service';
const BillPage = () => {
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
    <div>
      <Bill></Bill>
    </div>
  )
}

export default BillPage
