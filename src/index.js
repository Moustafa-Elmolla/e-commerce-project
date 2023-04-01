import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import NotFound from './components/NotFound/NotFound';

const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
    {index: true, element: <Home />},
    {path: 'login', element: <Login />},
    {path: 'register', element: <Register />},
    {path: 'cart', element: <Cart />},
    {path: 'products', element: <Products />},
    



    {path: '*', element: <NotFound />},
  ]}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={routes}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
