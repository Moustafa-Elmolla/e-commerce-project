import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Offline, Online } from "react-detect-offline";
import { Helmet } from "react-helmet";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [isloadingItem, setIsloadingItem] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);

  let { getCart, updateCart, removeCartItem } = useContext(CartContext);

  async function getCartDetails() {
    setIsloading(true);
    let response = await getCart();
    setIsloading(false);
    // console.log(response);
    setCartDetails(response.data);
  }
  async function updateCartHandle(id, count) {
    setIsloadingItem(true);
    let response = await updateCart(id, count);
    setIsloadingItem(false);
    // console.log(response);
    setCartDetails(response.data);
  }
  async function deleteCartHandle(id) {
    setLoadingRemove(true)
    let response = await removeCartItem(id);
    setLoadingRemove(false)
    // console.log(response);
    setCartDetails(response.data);
  }
  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Shop</title>
      </Helmet>
      {/* <Online><span className="network-status">Only shown when you're online</span></Online> */}
      <Offline>
        <span className="network-status">Only shown offline (surprise!)</span>
      </Offline>
      {isloading ? (
        <div className=" text-center">
          <i className="fas fa-spinner fa-spin fa-2x text-main my-5"></i>
        </div>
      ) : (
        <>
          {cartDetails && cartDetails.data && (
            <div className="container py-5 my-5">
              <div className="bg-main-light p-5">
                <h3>Cart Details</h3>
                <h4>Total Price : {cartDetails?.data.totalCartPrice}</h4>
                {cartDetails.data.products.map((product) => (
                  <div
                    key={product.product._id}
                    className="row border-bottom p-2"
                  >
                    <div className="col-md-1">
                      <img
                        src={product.product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-md-11 d-flex justify-content-between">
                      <div>
                        <h4>{product.product.title}</h4>
                        <p className="text-main">{product.price}</p>
                        <button onClick={() => deleteCartHandle(product.product._id)} className="btn text-danger">
                          {loadingRemove? <i className="fas fa-spinner fa-spin"></i>: <i className="fa fa-trash"></i>} Remove </button>
                      </div>

                      <div className="d-flex align-items-center">
                        <button
                          className="btn bg-main text-white"
                          onClick={() =>
                            updateCartHandle(
                              product.product._id,
                              product.count + 1
                            )
                          }
                        >
                          {isloadingItem ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "+"
                          )}
                        </button>
                        <p className="mx-3 mb-0">{product.count}</p>
                        <button
                          className="btn bg-danger text-white"
                          onClick={() =>
                            updateCartHandle(
                              product.product._id,
                              product.count - 1
                            )
                          }
                        >
                          {isloadingItem ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "-"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
