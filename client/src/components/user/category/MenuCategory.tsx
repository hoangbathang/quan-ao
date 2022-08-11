import React, { useEffect, useMemo, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Container from 'typedi';
import { STATUS_CODE } from '../../../constants/statuscode';
import { ICategory } from '../../../model/category';
import {
  GetAllCategoryDTO,
  IGETCategoryQuery,
} from '../../../model/dto/getCategory';
import { IRootState } from '../../../reducer/CreateRducer';
import { CategoryService } from '../../../service/user/category';
import styles from './menucategory.module.css';
interface Iprops {
  data: ICategory[];
}
const MenuCategory = (props: Iprops) => {
  const renderCategory = (data: ICategory[]) => {
    if (data.length > 0) {
      return data.map((item, key) => {
        return (
          <Nav key={key} className={`${styles['nav-item']}`}>
            <Link className="w-100" to={`/${item.menu_url}/${item.id}`}>
              <h5 className="text-uppercase text-success">{item.name}</h5>
            </Link>
          </Nav>
        );
      });
    }
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${styles['navbar-menu']}`}
      >
        <Navbar.Toggle className={`${styles['menu']}`} />
        <Navbar.Collapse className={`${styles['list-menu']}`}>
          <Nav className=" w-100 ">{renderCategory(props.data)}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MenuCategory;
