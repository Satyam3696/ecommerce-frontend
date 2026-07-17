import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import API from "../config/apiConfig";


const ViewMyCart = () => {


  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");


  const [carts, setCarts] = useState([]);

  const [cartAmount, setCartAmount] = useState("0.0");


  const navigate = useNavigate();





  useEffect(() => {


    const getAllCart = async () => {


      const allCart = await retrieveCart();



      if (allCart) {


        setCarts(allCart.carts);



        if(allCart.totalCartAmount){

          setCartAmount(allCart.totalCartAmount);

        }


      }


    };



    getAllCart();



  }, []);






  const retrieveCart = async () => {


    try {


      const response = await api.get(

        "/api/cart/fetch?userId=" + user.id,

        {

          headers:{

            Authorization:"Bearer " + customer_jwtToken,

          },

        }

      );



      console.log(response.data);



      return response.data;



    } catch(error){


      console.log(error);


      toast.error("It seems server is down",{

        position:"top-center",

        autoClose:1000,

      });


      return null;


    }


  };








  const deleteCart = async(cartId)=>{


    const data={

      id:cartId,

      userId:user.id,

    };



    try{


      const response = await api.delete(

        "/api/cart/delete",

        {

          headers:{

            Authorization:"Bearer " + customer_jwtToken,

          },

          data:data,

        }

      );



      const res=response.data;



      if(res.success){


        toast.success(res.responseMessage,{

          position:"top-center",

          autoClose:1000,

        });



        setTimeout(()=>{

          window.location.reload(true);

        },1000);



      }

      else{


        toast.error(res.responseMessage,{

          position:"top-center",

          autoClose:1000,

        });


      }



    }catch(error){


      console.log(error);



      toast.error("It seems server is down",{

        position:"top-center",

        autoClose:1000,

      });


    }


  };








  const updateCart = async(cart,quantity)=>{


    const data={

      id:cart.id,

      userId:user.id,

      quantity:quantity,

    };



    try{


      const response = await api.put(

        "/api/cart/update",

        data,

        {

          headers:{

            Authorization:"Bearer " + customer_jwtToken,

          },

        }

      );



      const res=response.data;



      if(res.success){


        toast.success(res.responseMessage,{

          position:"top-center",

          autoClose:1000,

        });



        setTimeout(()=>{

          window.location.reload(true);

        },1000);



      }



    }catch(error){


      console.log(error);



      toast.error("It seems server is down",{

        position:"top-center",

        autoClose:1000,

      });


    }


  };








  const incrementCart=(cart)=>{

    updateCart(cart,cart.quantity+1);

  };



  const decrementCart=(cart)=>{

    updateCart(cart,cart.quantity-1);

  };








  const checkout=(e)=>{


    e.preventDefault();



    if(carts.length < 1){


      toast.error("No Products In Cart To Order!!!",{

        position:"top-center",

        autoClose:1000,

      });


      return;


    }



    navigate("/customer/order/payment",{

      state:{priceToPay:cartAmount},

    });


  };








  return (

    <div className="mt-3">


      <div

        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"

        style={{

          height:"40rem",

        }}

      >




        <div

          className="card-header custom-bg-text text-center bg-color"

          style={{

            borderRadius:"1em",

            height:"50px",

          }}

        >

          <h2>My Cart</h2>

        </div>







        <div className="card-body" style={{overflowY:"auto"}}>


          <div className="table-responsive">


            <table className="table table-hover text-color text-center">


              <thead className="table-bordered border-color bg-color custom-bg-text">


                <tr>

                  <th>Product</th>

                  <th>Product Name</th>

                  <th>Category</th>

                  <th>Seller</th>

                  <th>Price</th>

                  <th>Quantity</th>

                  <th>Action</th>

                </tr>


              </thead>




              <tbody>



                {carts.map((cart)=>(


                  <tr key={cart.id}>


                    <td>


                      <img


                        src={`${API.PRODUCT}/${cart.product.image1}`}


                        className="img-fluid"


                        alt="product_pic"


                        style={{

                          maxWidth:"90px"

                        }}


                      />


                    </td>



                    <td>

                      <b>{cart.product.name}</b>

                    </td>



                    <td>

                      <b>{cart.product.category.name}</b>

                    </td>



                    <td>

                      <b>{cart.product.seller.firstName}</b>

                    </td>



                    <td>

                      <b>{cart.product.price}</b>

                    </td>





                    <td>



                      <button

                        onClick={()=>decrementCart(cart)}

                        className="btn btn-sm bg-color custom-bg-text me-2"

                      >

                        -

                      </button>




                      <b>{cart.quantity}</b>




                      <button

                        onClick={()=>incrementCart(cart)}

                        className="btn btn-sm bg-color custom-bg-text ms-2"

                      >

                        +

                      </button>



                    </td>





                    <td>


                      <button

                        onClick={()=>deleteCart(cart.id)}

                        className="btn btn-sm bg-color custom-bg-text ms-2"

                      >

                        Delete

                      </button>


                    </td>



                  </tr>



                ))}



              </tbody>



            </table>



          </div>



        </div>







        <div className="card-footer custom-bg">


          <div className="float-right">


            <div

              className="text-color me-2"

              style={{textAlign:"right"}}

            >


              <h5>

                Total Price: &#8377; {cartAmount}/-

              </h5>


            </div>





            <div className="float-end me-2">


              <button

                className="btn bg-color custom-bg-text mb-3"

                onClick={checkout}

              >

                Checkout

              </button>


            </div>



          </div>


        </div>




      </div>



    </div>


  );

};


export default ViewMyCart;


















