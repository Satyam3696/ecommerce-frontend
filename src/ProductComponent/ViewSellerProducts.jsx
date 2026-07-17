import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../config/apiConfig";


const ViewSellerProducts = () => {


  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");


  const [allProducts, setAllProducts] = useState([]);


  const navigate = useNavigate();



  useEffect(() => {


    const getAllProducts = async () => {


      const products = await retrieveAllProducts();


      if (products) {

        setAllProducts(products.products);

      }


    };


    getAllProducts();


  }, []);




  const retrieveAllProducts = async () => {


    try {


      const response = await axios.get(

        `${API.PRODUCT}/fetch/seller-wise?sellerId=${seller.id}`,

        {
          headers: {
            Authorization: "Bearer " + seller_jwtToken
          }
        }

      );


      console.log(response.data);


      return response.data;



    } catch(error) {


      console.log("Error fetching seller products", error);

      return null;


    }


  };






  const deleteProduct = async (productId) => {


    try {


      const response = await axios.delete(

        `${API.PRODUCT}/delete?productId=${productId}&sellerId=${seller.id}`,

        {

          headers: {

            Accept: "application/json",

            "Content-Type": "application/json",

            Authorization: "Bearer " + seller_jwtToken,

          },

        }

      );



      const res = response.data;



      if(res.success){


        toast.success(res.responseMessage, {

          position:"top-center",

          autoClose:1000,

        });



        setTimeout(()=>{

          window.location.reload(true);

        },1000);



      }

      else{


        toast.error(res.responseMessage, {

          position:"top-center",

          autoClose:1000,

        });



      }



    } catch(error){


      console.error(error);



      toast.error("It seems server is down", {

        position:"top-center",

        autoClose:1000,

      });



    }


  };






  const updateProduct = (product) => {


    navigate("/seller/product/update", {

      state: product

    });


  };






  return (

    <div className="mt-3">

      <div

        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"

        style={{

          height:"45rem",

        }}

      >



        <div

          className="card-header custom-bg-text text-center bg-color"

          style={{

            borderRadius:"1em",

            height:"50px",

          }}

        >

          <h2>My Products</h2>


        </div>




        <div

          className="card-body"

          style={{

            overflowY:"auto",

          }}

        >



          <div className="table-responsive">


            <table className="table table-hover text-color text-center">


              <thead className="table-bordered border-color bg-color custom-bg-text">


                <tr>

                  <th scope="col">Product</th>

                  <th scope="col">Name</th>

                  <th scope="col">Description</th>

                  <th scope="col">Category</th>

                  <th scope="col">Quantity</th>

                  <th scope="col">Price</th>

                  <th scope="col">Action</th>


                </tr>


              </thead>




              <tbody>



                {allProducts.map((product)=>(


                  <tr key={product.id}>


                    <td>


                      <img

                        src={`${API.PRODUCT}/${product.image1}`}

                        className="img-fluid"

                        alt="product_pic"

                        style={{

                          maxWidth:"90px",

                        }}

                      />


                    </td>



                    <td>

                      <b>{product.name}</b>

                    </td>



                    <td>

                      <b>{product.description}</b>

                    </td>



                    <td>

                      <b>{product.category.name}</b>

                    </td>



                    <td>

                      <b>{product.quantity}</b>

                    </td>



                    <td>

                      <b>{product.price}</b>

                    </td>



                    <td>


                      <button

                        onClick={()=>updateProduct(product)}

                        className="btn btn-sm bg-color custom-bg-text ms-2"

                      >

                        Update

                      </button>




                      <button

                        onClick={()=>deleteProduct(product.id)}

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



      </div>



    </div>


  );

};



export default ViewSellerProducts;











