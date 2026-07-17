import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import star from "../images/star.png";
import API from "../config/apiConfig";


const GetProductReviews = () => {


  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState("0.0");



  const { productId } = useParams();





  const retrieveAllReviews = async () => {


    try {


      const response = await axios.get(

        `${API.PRODUCT}/review/fetch?productId=${productId}`

      );


      return response.data;



    } catch(error) {


      console.log("Error fetching reviews :", error);

      return null;


    }


  };






  useEffect(() => {


    const getAllReviews = async () => {


      const allReviews = await retrieveAllReviews();



      if(allReviews){


        setReviews(allReviews.reviews);

        setRating(allReviews.averageRating);


      }


    };



    getAllReviews();



  }, [productId]);







  return (


    <div

      className="list-group form-card border-color"

      style={{

        height:"25rem",

      }}

    >




      <div

        className="list-group-item list-group-item-action bg-color custom-bg-text"

      >


        <b>


          Product Reviews [Rating: {rating} ]



          <img

            src={star}

            width="20"

            height="20"

            className="d-inline-block align-top"

            alt="star"

          />


        </b>



      </div>






      <div

        style={{

          overflowY:"auto",

        }}

      >




        {reviews.map((review)=>(



          <div

            key={review.id}

            className="list-group-item list-group-item-action text-color custom-bg"

          >



            <b className="text-color1">

              {review.user.firstName + " "}

            </b>




            <b className="text-color">

              {review.star + " /5 "}

            </b>




            <img

              src={star}

              width="20"

              height="20"

              className="d-inline-block align-top"

              alt="star"

            />





            <br />





            <p>

              {review.review}

            </p>




          </div>



        ))}



      </div>



    </div>


  );


};



export default GetProductReviews;










