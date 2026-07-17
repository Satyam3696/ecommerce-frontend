import { useState, useEffect } from "react";
import React from "react";
import api from "../services/api";

const ViewAllCustomers = () => {

  const [allCustomer, setAllCustomer] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");



  useEffect(() => {

    const getAllUsers = async () => {

      const allUsers = await retrieveAllUser();

      if (allUsers) {

        setAllCustomer(allUsers.users);

      }

    };


    getAllUsers();


  }, []);





  const retrieveAllUser = async () => {

    const response = await api.get(
      "/api/user/fetch/role-wise?role=Customer",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );


    console.log(response.data);


    return response.data;

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
            All Customers
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

                  <th scope="col">
                    First Name
                  </th>


                  <th scope="col">
                    Last Name
                  </th>


                  <th scope="col">
                    Email Id
                  </th>


                  <th scope="col">
                    Phone No
                  </th>


                  <th scope="col">
                    Address
                  </th>


                </tr>


              </thead>





              <tbody>


                {allCustomer.map((customer) => (


                  <tr key={customer.id}>


                    <td>

                      <b>
                        {customer.firstName}
                      </b>

                    </td>



                    <td>

                      <b>
                        {customer.lastName}
                      </b>

                    </td>




                    <td>

                      <b>
                        {customer.emailId}
                      </b>

                    </td>




                    <td>

                      <b>
                        {customer.phoneNo}
                      </b>

                    </td>




                    <td>

                      <b>

                        {customer.address.street +
                          ", " +
                          customer.address.city +
                          ", " +
                          customer.address.pincode}

                      </b>

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


export default ViewAllCustomers;














