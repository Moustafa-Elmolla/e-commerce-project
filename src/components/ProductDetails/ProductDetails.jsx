import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';

const ProductDetails = () => {
  let {creatCart} = useContext(CartContext)

  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let {id} = useParams();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function getProductDetails(id) {
    setIsLoading(true)
    let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    setIsLoading(false)
    // console.log(data.data);
  }

  useEffect(() => {
    getProductDetails(id)
  }, [])

  return (
    <>
    <div className="container">
      <div className="row align-items-center py-5">
        {isLoading? <div className='text-center'><i className='fas fa-spinner fa-spin fa-2x text-main'></i></div>: 
        <>
        <div className="col-md-4">
          <Slider {...settings}>
          {productDetails?.images.map((img)=> <img key={img._id} className='w-100' src={img} alt='' />)}
          </Slider>
          
        </div>
        <div className="col-md-8">
          <h3>{productDetails?.title}</h3>
          <p className='p-2'>{productDetails?.description}</p>
          <div className="d-flex justify-content-between">
                <p>{productDetails?.price} EPG</p>
                <div>
                  <i className='fa fa-star rating-color'></i>
                  {productDetails?.ratingsAverage}
                </div>
              </div>
              <button onClick={() => creatCart(productDetails._id)} className='btn bg-main text-white w-100'>+ Add</button>
        </div>
        </>}
        
      </div>

    </div>
    </>
  );
}

export default ProductDetails;
