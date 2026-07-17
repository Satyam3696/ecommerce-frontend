import { useState, useEffect } from "react";
import api from "../services/api";
import API from "../config/apiConfig";


const ViewMyOrders = () => {

  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [orders, setOrders] = useState([]);

  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");


  useEffect(() => {
    getAllOrders();
  }, []);



  const getAllOrders = async () => {

    try {

      const response = await api.get(

        `${API.ORDER}/fetch/user-wise?userId=${user.id}`,

        {
          headers: {

            Authorization: "Bearer " + customer_jwtToken,

          },
        }

      );


      console.log(response.data);


      if(response.data){

        setOrders(response.data.orders || []);

      }


    }
    catch(error){

      console.error("Error fetching orders", error);

    }

  };




  const formatDateFromEpoch = (epochTime) => {

    if(!epochTime){

      return "Pending";

    }


    const date = new Date(Number(epochTime));


    return date.toLocaleString();

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
            height:"50px"
          }}
        >

          <h2>My Orders</h2>

        </div>



        <div
          className="card-body"
          style={{
            overflowY:"auto"
          }}
        >


          <div className="table-responsive">


            <table className="table table-hover text-color text-center">


              <thead className="table-bordered border-color bg-color custom-bg-text">


                <tr>

                  <th>Order Id</th>
                  <th>Product</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Order Time</th>
                  <th>Status</th>
                  <th>Delivery Person</th>
                  <th>Delivery Contact</th>
                  <th>Delivery Time</th>

                </tr>


              </thead>



              <tbody>


              {

                orders.length === 0 ?

                (

                  <tr>

                    <td colSpan="12">

                      <b>No Orders Found</b>

                    </td>

                  </tr>

                )


                :


                orders.map((order)=>(


                  <tr key={order.id}>


                    <td>
                      <b>{order.orderId}</b>
                    </td>



                    <td>

                      {

                        order.product &&

                        <img

                          src={`${API.PRODUCT}/${order.product.image1}`}

                          className="img-fluid"

                          alt="product"

                          style={{
                            maxWidth:"90px"
                          }}

                        />

                      }


                    </td>




                    <td>
                      <b>
                        {order.product?.name || "N/A"}
                      </b>
                    </td>



                    <td>
                      <b>
                        {order.product?.category?.name || "N/A"}
                      </b>
                    </td>



                    <td>
                      <b>
                        {order.product?.seller?.firstName || "N/A"}
                      </b>
                    </td>



                    <td>
                      <b>
                        ₹ {order.product?.price || 0}
                      </b>
                    </td>



                    <td>
                      <b>
                        {order.quantity}
                      </b>
                    </td>



                    <td>

                      <b>
                        {formatDateFromEpoch(order.orderTime)}
                      </b>

                    </td>



                    <td>

                      <b>
                        {order.status}
                      </b>

                    </td>



                    <td>

                    {

                      order.deliveryPerson ?

                      (

                        <b>
                          {order.deliveryPerson.firstName}
                        </b>

                      )

                      :

                      (

                        <b className="text-danger">
                          Pending
                        </b>

                      )

                    }

                    </td>




                    <td>

                    {

                      order.deliveryPerson ?

                      (

                        <b>
                          {order.deliveryPerson.phoneNo}
                        </b>

                      )

                      :

                      (

                        <b className="text-danger">
                          Pending
                        </b>

                      )

                    }

                    </td>




                    <td>

                    {

                      order.deliveryDate ?

                      (

                        <b>
                          {order.deliveryDate} {order.deliveryTime}
                        </b>

                      )

                      :

                      (

                        <b className="text-danger">
                          Pending
                        </b>

                      )

                    }

                    </td>



                  </tr>


                ))


              }


              </tbody>


            </table>


          </div>


        </div>


      </div>


    </div>

  );

};


export default ViewMyOrders;