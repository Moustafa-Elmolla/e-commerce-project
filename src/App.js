import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails'
import NotFound from './components/NotFound/NotFound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import CounterContextProvider from './Context/CounterContext';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders'


function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if(localStorage.getItem("userToken")) {
      saveUser()
    }
  }, [])

  function saveUser() {
    let encodedToken = localStorage.getItem("userToken")
    let decoded = jwtDecode(encodedToken)
    // console.log(decoded);
    setUserData(decoded)
  }

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout userData= {userData} setUserData= {setUserData} />, children: [
      {index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      {path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes>},
      {path: 'login', element: <Login saveUser={saveUser} />},
      {path: 'register', element: <Register />},
      {path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes>},
      {path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes>},
      {path: 'checkout', element: <ProtectedRoutes><Checkout /></ProtectedRoutes>},
      {path: 'allorders', element: <ProtectedRoutes><AllOrders /></ProtectedRoutes>},
      {path: 'productdetails/:id', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
    
      {path: '*', element: <NotFound />},
    ]}
  ])
  return (
  <CartContextProvider>
  <CounterContextProvider>
    <Toaster />
    <RouterProvider router={routes}></RouterProvider>;
  </CounterContextProvider>
  </CartContextProvider>
  )
}

export default App;


