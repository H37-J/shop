import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../App';
import { ModuleRoutes} from './ModuleRoutes';


import { ShopRoutes } from './ShopRoutes';
const AppRoutes = () => {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<App />}>
          <Route path="/shop/*" element={<ShopRoutes />} />
          <Route path="/modules/*" element={<ModuleRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
