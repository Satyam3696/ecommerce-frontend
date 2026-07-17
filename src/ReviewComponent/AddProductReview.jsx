import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import ProductCarousel from "../ProductComponent/ProductCarousel";
import API from "../config/apiConfig";


const AddProductReview = () => {


  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");


  const location = useLocation();

  const product = location.state;



  const [userId, setUserId] = useState(user ? user.id : "");

  const { productId } = useParams();



  const [star, setStar] = useState("");

  const [review, setReview] = useState("");



  const navigate = useNavigate();





  const saveReview = async (e) => {


    e.preventDefault();



    if(user == null){


      alert("Please login as Customer for adding your review!!!");

      return;


    }




    try {



      setUserId(user.id);



      const data = {

        userId:user.id,

        productId,

        star,

        review

      };





      const response = await axios.post(

        `${API.PRODUCT}/review/add`,

        data,

        {

          headers:{

            Accept:"application/json",

            "Content-Type":"application/json",

            Authorization:"Bearer " + customer_jwtToken,

          }

        }

      );





      const res = response.data;





      if(res.success){



        toast.success(res.responseMessage,{

          position:"top-center",

          autoClose:1000,

        });




        setTimeout(()=>{


          navigate(

            "/product/" + product.id + "/category/" + product.category.id

          );


        },2000);



      }

      else{


        toast.error(res.responseMessage,{

          position:"top-center",

          autoClose:1000,

        });



      }




    } catch(error){


      console.log(error);



      toast.error("It Seems Server is down!!!",{

        position:"top-center",

        autoClose:1000,

      });


    }


  };






  return (


    <div className="container-fluid mb-5">


      <div className="row">


        <div className="col-sm-2 mt-2"></div>



        <div className="col-sm-3 mt-2">


          <div className="card form-card border-color custom-bg">


            <ProductCarousel

              item={{

                image1:product.image1,

                image2:product.image2,

                image3:product.image3,

              }}

            />


          </div>


        </div>





        <div className="col-sm-5 mt-2">


          <div

            className="card form-card border-color custom-bg"

            style={{width:"30rem"}}

          >



            <div className="card-header bg-color text-center custom-bg-text">


              <h5 className="card-title">

                Add Product Review

              </h5>


            </div>





            <div className="card-body text-color">



              <form onSubmit={saveReview}>


                <div className="mb-3">


                  <label className="form-label">

                    <b>Star</b>

                  </label>




                  <select

                    onChange={(e)=>setStar(e.target.value)}

                    className="form-control"

                  >


                    <option value="">Select Star</option>

                    <option value="1">1</option>

                    <option value="2">2</option>

                    <option value="3">3</option>

                    <option value="4">4</option>

                    <option value="5">5</option>


                  </select>



                </div>





                <div className="mb-3">


                  <label htmlFor="review" className="form-label">


                    <b>Product Review</b>


                  </label>




                  <textarea


                    className="form-control"

                    id="review"

                    rows="3"

                    placeholder="enter review.."

                    onChange={(e)=>setReview(e.target.value)}

                    value={review}


                  />



                </div>





                <input


                  type="submit"

                  className="btn bg-color custom-bg-text"

                  value="Add Review"


                />





                <ToastContainer />


              </form>



            </div>



          </div>



        </div>



      </div>



    </div>


  );

};



export default AddProductReview;




