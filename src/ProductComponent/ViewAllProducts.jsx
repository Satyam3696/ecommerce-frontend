import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../config/apiConfig";


const ViewAllProducts = () => {

  const [allProducts, setAllProducts] = useState([]);

  const token = localStorage.getItem("token");


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
        `${API.PRODUCT}/fetch/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      console.log(response.data);

      return response.data;


    } catch (error) {

      console.log("Error fetching products :", error);

      return null;

    }

  };



  return (

    <div className="mt-3">

      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "45rem",
        }}
      >


        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >

          <h2>My Products</h2>

        </div>



        <div
          className="card-body"
          style={{
            overflowY: "auto",
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

                  <th scope="col">Seller</th>

                </tr>

              </thead>



              <tbody>


                {allProducts.map((product) => (

                  <tr key={product.id}>


                    <td>

                      <img

                       src={`${API.PRODUCT}/${product.image1}`}

                        className="img-fluid"

                        alt="product_pic"

                        style={{
                          maxWidth: "90px",
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

                      <b>{product.seller.firstName}</b>

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


export default ViewAllProducts;








