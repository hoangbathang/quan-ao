import React, { useEffect, useState } from 'react'
import Container from 'typedi'
import Footer from '../../components/user/footer/Footer'
import Header from '../../components/user/header/Header'
import NewProduct from '../../components/user/new-products/NewProduct'
import TopPick from '../../components/user/top-pick/TopPick'
import { GetAllHomeProductDTO } from '../../model/dto/getHomeproduct'
import { IPublichHomeProduct } from '../../model/PublichHomeProduct'
import { HomeProductService } from '../../service/user/home.service'

const Home = ()=> {
    const homeService = Container.get(HomeProductService);
    const [product, setproduct] = useState<IPublichHomeProduct>();
    const getAllProductHomeDTO = new GetAllHomeProductDTO({ agentCode: '/' });
    useEffect(() => {
        homeService.showproduct(getAllProductHomeDTO).then((result) => {
            if (result?.data) {
                setproduct(result.data);
            } 
        })
    }, [])
    return (
        <div>
            
            {product?.products_new ? <NewProduct  products_new={product.products_new} ></NewProduct> : ''}
            {product?.products_new ? <TopPick  toppick={product.toppick_product} ></TopPick> : ''}
            
        </div>
    )
}

export default Home
