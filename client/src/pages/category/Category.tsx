import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router';
import Container from 'typedi';
import ListProduct from '../../components/user/category/ListProduct'
import MenuCategory from '../../components/user/category/MenuCategory'
import { STATUS_CODE } from '../../constants/statuscode';
import { ICategory } from '../../model/category';
import { GetAllCategoryDTO, IGETCategoryQuery } from '../../model/dto/getCategory';
import { GetProductCategoryDTO, IGETProductCategoryQuery } from '../../model/dto/getproductcateogry';
import { IProduct } from '../../model/PublichHomeProduct';
import { CategoryService } from '../../service/user/category';
import styles from './category.module.css';
const Category = () => {
    const [listcategory, setcategory] = useState<ICategory[]>([]);
    const [productcategory, setproductcategory] = useState<IProduct[]>([]);
    const categoryService = Container.get(CategoryService);
    const location = useLocation();
    const queryproductcategory: IGETProductCategoryQuery = {
        agentCode: `/category${location.pathname}`
    }
    useEffect(() => {
        categoryService.showproduct(new GetProductCategoryDTO(queryproductcategory)).then((result) => {
            if (result.data && result.status === STATUS_CODE.SUCCESS) {
                setproductcategory(result.data.product);
                setcategory(result.data.menu)
            }
        })


    }, [location.pathname])
    return (
        <Row>
            <Row className={`${styles['header-menu']}`}>
                <Col className={`${styles['header']}`}><MenuCategory data={listcategory}></MenuCategory></Col>
            </Row>
            <Row className={`${styles['']} mt-5`}>
                <Col><ListProduct data={productcategory}></ListProduct></Col>
            </Row>

        </Row>



    )
}

export default Category

