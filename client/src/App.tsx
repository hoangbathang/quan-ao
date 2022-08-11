import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Form, Button } from 'react-bootstrap';
import './App.css';
import Header from './components/user/header/Header';

import Footer from './components/user/footer/Footer';


import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import 'reflect-metadata';
import { IRoute } from './model/Route';
import { RouterUser } from './router/user/router';
import * as typedi from 'typedi';
import { MenuService } from './service/user/menu.service';
import { GetAllMenuDTO } from './model/dto/getMenu.dto';
import { IPublichMenu } from './model/PublichMenu';
import Category from './pages/category/Category';
import { useDispatch, useSelector } from 'react-redux';
import * as action from './action/menu.action';
import { IRootState } from './reducer/CreateRducer';
import NotFound from './components/user/notfound/NotFound';
function App() {
  const menuService = typedi.Container.get(MenuService);
  const getAllMenuDTO = new GetAllMenuDTO({ agentCode: '/menu' });
  const dataMenu: IPublichMenu[] | undefined = useSelector((state: IRootState) => {
    if (state.Menu !== undefined) {
      return state.Menu;
    }
  });
  const menu = useMemo(() => dataMenu, [dataMenu]);
  const renderRouter = (data: IRoute[]) => {
    return data.map((item, key) => {
      return <Route key={key} path={`${item.url}`} element={<item.component></item.component>} />
    });
  }
  const renderRouterCategory = (data: IPublichMenu[]) => {
    return data.map((item, key) => {
      
      return <Route key={key} path={`/${item.url}`} element={<Category></Category>} />
    })

  }
  const renderRouterDetailCategory = (data: IPublichMenu[]) => {
    return data.map((item, key) => { 
      return <Route key={key} path={`/${item.url}/:id`} element={<Category></Category>} />
    })
  }
  return (
    <Router>
      <Container>
        <Header></Header>
        <Routes>
          {renderRouter(RouterUser)}
          {menu ? renderRouterCategory(menu): ''}
          {menu ? renderRouterDetailCategory(menu): ''}
          <Route  path='*' element={<NotFound></NotFound>} />
        </Routes>
        <Footer></Footer>
      </Container>
    </Router>

  );
}

export default App;
