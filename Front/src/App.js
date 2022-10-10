import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Admin from './Component/Admin/Admin';
import User from './Component/User/User';
import Register from './Component/Register';
import FarmersList from './Component/Admin/FarmersList';
import AddNewFarmer from './Component/Admin/AddNewFarmer';
import Category from './Component/Admin/Category';
import AddProduct from './Component/Admin/AddProduct';
import ProductsList from './Component/Admin/ProductsList';
import AdminProfile from './Component/Admin/AdminProfile';
import PageLoading from './Component/PageLoading';
import OrderDetails from './Component/Admin/OrderDetails';
import CheckOut from './Component/User/CheckOut';
import Orders from './Component/User/Orders';
import UserProfile from './Component/User/UserProfile'
import toast, { Toaster } from 'react-hot-toast';
import UsersList from './Component/Admin/UsersList';
import PaymentGateway from './Component/User/PaymentGateway';
import UserPrivateRoutes from './Component/UserPrivateRoutes';
import AdminProtectedRoutes from './Component/AdminPrivateRoutes';

function App() {

  return (
    <BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2200,
        }}
      />

      <Routes>

        <Route exact path="/" element={<LoginForm />} />
        <Route path='/register' element={<Register />} />
        <Route path='/pageload' element={<PageLoading />} />

        <Route element={<AdminProtectedRoutes />} >

          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/farmer' element={<FarmersList />} />
          <Route path='/admin/category' element={<Category />} />
          <Route path='/admin/addnewfarmer' element={<AddNewFarmer />} />
          <Route path="/admin/updatefarmer/:farmerId" element={<AddNewFarmer />} />
          <Route path="/admin/addproduct/:farmerId" element={<AddProduct />} />
          <Route path='/admin/productslist' element={<ProductsList />} />
          <Route path='/admin/profile' element={<AdminProfile />} />
          <Route path='/admin/order' element={<OrderDetails />} />
          <Route path='/admin/userslist' element={<UsersList />} />
          
        </Route>

        <Route element={<UserPrivateRoutes />}>

          <Route path='/user' element={<User />} />
          <Route path='/user/checkout' element={<CheckOut />} />
          <Route path='/user/orders' element={<Orders />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/payment' element={<PaymentGateway />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
