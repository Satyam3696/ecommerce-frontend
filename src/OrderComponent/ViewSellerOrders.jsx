import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import api from "../services/api";


const ViewSellerOrders = () => {


  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");


  const [orders, setOrders] = useState([]);

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const [assignOrderId, setAssignOrderId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");

  const [allDelivery, setAllDelivery] = useState([]);

  const [showModal, setShowModal] = useState(false);




  const handleClose = () => {

    setShowModal(false);

  };



  const handleShow = () => {

    setShowModal(true);

  };





  useEffect(() => {


    getAllOrders();

    getAllDeliveryPersons();


  }, [orderId]);







  const getAllOrders = async () => {


    try {


      let response;



      if(orderId){


        response = await retrieveOrdersById();


      }

      else{


        response = await retrieveAllOrders();


      }




      if(response){


        setOrders(response.orders || []);


      }



    }

    catch(error){


      console.error("Order fetch error:", error);


    }



  };









  const getAllDeliveryPersons = async()=>{


    try{


      const response = await retrieveAllUser();



      if(response){


        setAllDelivery(response.users || []);


      }



    }

    catch(error){


      console.error("Delivery person fetch error:", error);


    }



  };












  const retrieveAllOrders = async()=>{



    const response = await api.get(

      "/api/order/fetch/seller-wise?sellerId=" + seller.id,

      {

        headers:{

          Authorization:

          "Bearer " + seller_jwtToken

        }

      }

    );



    console.log(response.data);



    return response.data;



  };









  const retrieveAllUser = async()=>{



    const response = await api.get(

      "/api/user/fetch/seller/delivery-person?sellerId=" + seller.id,

      {

        headers:{

          Authorization:

          "Bearer " + seller_jwtToken

        }

      }

    );



    console.log(response.data);



    return response.data;



  };









  const retrieveOrdersById = async()=>{



    const response = await api.get(

      "/api/order/fetch?orderId=" + orderId

    );



    console.log(response.data);



    return response.data;



  };












  const formatDateFromEpoch = (epochTime)=>{


    if(!epochTime){


      return "Pending";


    }



    const date = new Date(Number(epochTime));



    return date.toLocaleString();



  };












  const searchOrderById = (e)=>{


    e.preventDefault();



    setOrderId(tempOrderId);



  };












  const assignDelivery = (orderId)=>{


    setAssignOrderId(orderId);



    handleShow();



  };













  const assignToDelivery = async()=>{



    const data = {


      orderId: assignOrderId,

      deliveryId: deliveryPersonId


    };





    try{



      const response = await api.put(


        "/api/order/assign/delivery-person",


        data,


        {


          headers:{


            Authorization:

            "Bearer " + seller_jwtToken


          }


        }


      );





      if(response.data.success){



        toast.success(

          response.data.responseMessage,

          {

            position:"top-center",

            autoClose:1000

          }

        );





        setTimeout(()=>{


          window.location.reload();


        },1500);



      }



      else{



        toast.error(

          response.data.responseMessage,

          {

            position:"top-center",

            autoClose:1000

          }

        );



      }



    }



    catch(error){



      console.error(error);



      toast.error(

        "It seems server is down",

        {

          position:"top-center",

          autoClose:1000

        }

      );



    }



  };


  //--------------
   return (

    <div className="mt-3">


      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height:"40rem"
        }}
      >


        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius:"1em",
            height:"50px"
          }}
        >

          <h2>Seller Orders</h2>

        </div>




        <div
          className="card-body"
          style={{
            overflowY:"auto"
          }}
        >




          <form className="row g-3">


            <div className="col-auto">


              <input

                type="text"

                className="form-control"

                placeholder="Enter Order Id..."

                value={tempOrderId}

                onChange={(e)=>setTempOrderId(e.target.value)}

              />


            </div>




            <div className="col-auto">


              <button

                type="submit"

                className="btn bg-color custom-bg-text mb-3"

                onClick={searchOrderById}

              >

                Search

              </button>


            </div>


          </form>







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
                  <th>Customer</th>
                  <th>Order Time</th>
                  <th>Status</th>
                  <th>Delivery Person</th>
                  <th>Contact</th>
                  <th>Delivery Time</th>
                  <th>Action</th>

                </tr>


              </thead>





              <tbody>


              {

                orders.length === 0 ?

                (

                  <tr>

                    <td colSpan="14">

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

                          src={
                            `${api.defaults.baseURL}/api/product/${order.product.image1}`
                          }

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

                        {order.user?.firstName || "N/A"}

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

                          Processing

                        </b>

                      )

                    }


                    </td>








                    <td>


                    {

                      order.deliveryPerson ?

                      (

                        <b>

                          Delivery Assigned

                        </b>

                      )

                      :

                      (

                        <button

                          className="btn btn-sm bg-color custom-bg-text"

                          onClick={()=>assignDelivery(order.orderId)}

                        >

                          Assign Delivery

                        </button>

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









      <Modal show={showModal} onHide={handleClose}>


        <Modal.Header closeButton className="bg-color custom-bg-text">


          <Modal.Title>

            Assign To Delivery Person

          </Modal.Title>


        </Modal.Header>






        <Modal.Body>


          <div className="ms-3 mt-3 mb-3 me-3">



            <div className="mb-3">


              <label className="form-label">

                <b>Order Id</b>

              </label>



              <input

                type="text"

                className="form-control"

                value={assignOrderId}

                readOnly

              />



            </div>







            <div className="mb-3">


              <label className="form-label">

                <b>Delivery Person</b>

              </label>





              <select

                className="form-control"

                value={deliveryPersonId}

                onChange={(e)=>setDeliveryPersonId(e.target.value)}

              >



                <option value="">

                  Select Delivery Person

                </option>





                {

                  allDelivery.map((delivery)=>(


                    <option

                      key={delivery.id}

                      value={delivery.id}

                    >

                      {delivery.firstName} {delivery.lastName}

                    </option>


                  ))

                }





              </select>



            </div>







            <div className="text-center">


              <button

                className="btn bg-color custom-bg-text"

                onClick={assignToDelivery}

              >

                Assign

              </button>



            </div>




            <ToastContainer/>




          </div>


        </Modal.Body>








        <Modal.Footer>


          <Button

            variant="secondary"

            onClick={handleClose}

          >

            Close

          </Button>



        </Modal.Footer>



      </Modal>






    </div>


  );



};


export default ViewSellerOrders;