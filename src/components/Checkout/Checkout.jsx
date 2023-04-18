import React, { useContext } from 'react';
import styles from './Checkout.module.css'
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
const Checkout = () => {

  let {generateOnlinePayment, cartId} = useContext(CartContext)

  async function handlePayment(values) {
    // console.log(values);
    let {data} = await generateOnlinePayment(cartId, values)
    console.log(data);
    if (data.session) {
      console.log(data.session.url);
      window.location.href = data.session.url
    }
  }
  let formik = useFormik({
    initialValues: {
      details:'',
      phone:'',
      city:''
    },
    onSubmit: handlePayment
  })
  return <>
  <div className="container">
    <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
      <label htmlFor="details">Details</label>
      <input type="text" className='form-control mb-3' id='details' name='details' onChange={formik.handleChange} value={formik.values.details} />
      <label htmlFor="phone">Phone</label>
      <input type="tel" className='form-control mb-3' id='phone' name='phone' onChange={formik.handleChange} value={formik.values.phone} />
      <label htmlFor="city">City</label>
      <input type="text" className='form-control mb-3' id='city' name='city' onChange={formik.handleChange} value={formik.values.city} />

      <button type='submit' className='btn btn-outline-info w-100'>Pay</button>
    </form>
  </div>
  
  </>
}

export default Checkout;
