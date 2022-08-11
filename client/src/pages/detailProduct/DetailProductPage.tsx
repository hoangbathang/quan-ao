import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'typedi';
import DetailProduct from '../../components/user/product/DetailProduct';
import { GetDetailProductDTO } from '../../model/dto/getDetailProduct.dto';
import { DetailProductService } from '../../service/user/detailProduct';
import * as action from '../../action/product.action';
import { IRootState } from '../../reducer/CreateRducer';
import NotFound from '../../components/user/notfound/NotFound';
import { AuthService } from '../../service/user/auth.service';
const DetailProductPage = () => {
  const Dispatch = useDispatch();
  const detailProductService = Container.get(DetailProductService);
  const location = useLocation();
  const getDetailProductDTO = new GetDetailProductDTO({ agentCode: location.pathname });
  const [Isloading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    detailProductService.showproduct(getDetailProductDTO).then((result) => {
      if (result?.data) {
        console.log(result)
        Dispatch(action.addproduct(result?.data));
        setIsloading(true);
      }
    })
  }, [])
  return (
    <div>
      {Isloading ? <DetailProduct></DetailProduct > : '' }
    </div >
  )
}

export default DetailProductPage

