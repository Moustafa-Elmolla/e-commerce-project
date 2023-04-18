import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0)

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    getInitialValues()
  }, [])

  async function getInitialValues() {
    let {data} = await getCart()
    if(data.status === "success") {
      setNumOfCartItems(data.numOfCartItems)
      setCartId(data.data._id)
      // console.log(data.numOfCartItems, data.data._id);
    }
  }
  let headers = {token: localStorage.getItem("userToken")}

  function creatCart(x) {
    return axios.post(
      `https://route-ecommerce.onrender.com/api/v1/cart`, 
      {productId: x},
      {
        headers,
      }
    ).then(res => res)
    .catch(err => err)
  }

  function getCart() {
    return axios.get(
      `https://route-ecommerce.onrender.com/api/v1/cart`, 
      {
        headers,
      }
    ).then(res => res)
    .catch(err => err)
  }

  function updateCart(id,count) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {count}, {
        headers,
      }
    ).then(res => res)
    .catch(err => err)
  }

  function removeCartItem(id) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {
        headers,
      }
    ).then(res => res)
    .catch(err => err)
  }

  function generateOnlinePayment(cartId, shippingAddress) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
      shippingAddress
    },
    {
      headers
    }
    ).then(res => res)
    .catch(err => err)
    
  }

  const [cart, setCart] = useState(0);
  return <CartContext.Provider value={{setNumOfCartItems, numOfCartItems,cartId ,generateOnlinePayment,cart,creatCart, getCart, updateCart, removeCartItem}}>
  {props.children}
  </CartContext.Provider>

}