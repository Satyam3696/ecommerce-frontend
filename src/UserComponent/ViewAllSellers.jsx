import { useState, useEffect } from "react";
import React from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const ViewAllSellers = () => {

  const [allSeller, setAllSeller] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");



  useEffect(() => {

    const getAllUsers = async () => {

      const allUsers = await retrieveAllUser();

      if (allUsers) {

        setAllSeller(allUsers.users);

      }

    };


    getAllUsers();


  }, []);





  const retrieveAllUser = async () => {


    const response = await api.get(

      "/api/user/fetch/role-wise?role=Seller",

      {

        headers: {

          Authorization: "Bearer " + admin_jwtToken,

        },

      }

    );


    console.log(response.data);


    return response.data;


  };





  const deleteSeller = async (userId) => {


    try {


      const response = await api.delete(

        "/api/user/delete/seller?sellerId=" + userId,

        {

          headers: {

            Authorization: "Bearer " + admin_jwtToken,

          },

        }

      );



      const res = response.data;




      if (res.success) {


        toast.success(res.responseMessage, {

          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,

        });



        setTimeout(() => {

          window.location.reload(true);

        }, 1000);



      } else {


        toast.error(res.responseMessage, {

          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,

        });



      }


    } catch (error) {


      console.error(error);


      toast.error("It seems server is down", {

        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

      });


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

          <h2>
            All Sellers
          </h2>


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

                  <th>
                    First Name
                  </th>

                  <th>
                    Last Name
                  </th>

                  <th>
                    Email Id
                  </th>

                  <th>
                    Phone No
                  </th>

                  <th>
                    Address
                  </th>

                  <th>
                    Action
                  </th>

                </tr>


              </thead>





              <tbody>


                {allSeller.map((seller) => (


                  <tr key={seller.id}>


                    <td>

                      <b>
                        {seller.firstName}
                      </b>

                    </td>



                    <td>

                      <b>
                        {seller.lastName}
                      </b>

                    </td>



                    <td>

                      <b>
                        {seller.emailId}
                      </b>

                    </td>



                    <td>

                      <b>
                        {seller.phoneNo}
                      </b>

                    </td>




                    <td>

                      <b>

                        {seller.address.street +
                          ", " +
                          seller.address.city +
                          ", " +
                          seller.address.pincode}

                      </b>


                    </td>




                    <td>


                      <button

                        onClick={() => deleteSeller(seller.id)}

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


export default ViewAllSellers;










