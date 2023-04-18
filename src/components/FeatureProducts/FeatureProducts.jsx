import React, { useContext, useEffect, useState } from 'react';
import styles from './FeatureProducts.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

const FeatureProducts = () => {

  let {creatCart, setNumOfCartItems} = useContext(CartContext)

  const [allProducts, setallProducts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isloadingItem, setIsloadingItem] = useState(false);

  async function getProducts() {
    setIsloading(true)
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setIsloading(false)
    // console.log(data.data);
    setallProducts(data.data)
  }

  async function generateCart(productId) {
    setIsloadingItem(true)
    let response = await creatCart(productId)
    setIsloadingItem(false)
    // console.log(response, "from feature product");
    if(response.data.status == "success") {
      toast.success(response.data.message ,{
        position: "bottom-right",
        style: {
          background: "green",
          color: "white"
        }
      })
      setNumOfCartItems(response.data.numOfCartItems)
    }else {
      toast.error(response.data.message ,{
        position: "bottom-right",
        style: {
          background: "red",
          color: "white"
        }
      })
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
    {isloading ? <div className=' text-center'><i className='fas fa-spinner fa-spin fa-2x text-main my-5'></i></div>: 
    <div className="container py-4">
    <div className="row">
      {allProducts.map((product) => <div key={product._id} className="col-md-2">
        <div className="product px-2 py-3 position-relative">
          <button className='btn bg-transparent position-absolute top-0 end-0'><i className="fa-regular fa-heart fa-lg"></i></button>
          <Link to={`/productdetails/${product._id}`}>
          <img src={product.imageCover} className='w-100' alt="" />
          <p className='text-main'>{product.category.name}</p>
          <h3 className='h6'>{product.title.split(" ").splice(0, 2).join(" ")}</h3>
          <div className="d-flex justify-content-between">
            <p>{product.price} EPG</p>
            <div>
              <i className='fa fa-star rating-color'></i>
              {product.ratingsAverage}
            </div>
          </div>
          </Link>
          <button onClick={()=> generateCart(product._id)} className='btn bg-main text-white w-100'>{isloadingItem? <i className='fas fa-spinner fa-spin'></i>: "+ Add"} </button>
        </div>
    </div>)}
      
    </div>
  </div>
    }
      
    </>
  );
}

export default FeatureProducts;
