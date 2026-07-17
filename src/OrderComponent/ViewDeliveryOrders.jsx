import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";


import API from "../config/apiConfig";
const ViewDeliveryOrders = () => {

  const deliveryPerson = JSON.parse(
    sessionStorage.getItem("active-delivery")
  );

  const delivery_jwtToken = sessionStorage.getItem(
    "delivery-jwtToken"
  );


  const [orders, setOrders] = useState([]);

  const [deliveryUpdateRequest, setDeliveryUpdateRequest] =
    useState({
      orderId: "",
      deliveryStatus: "",
      deliveryTime: "",
      deliveryDate: "",
      deliveryId: deliveryPerson.id,
    });


  const [deliveryStatus, setDeliveryStatus] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);


  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const [assignOrderId, setAssignOrderId] = useState("");


  const [showModal, setShowModal] = useState(false);


  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);



  const handleInput = (e) => {

    setDeliveryUpdateRequest({
      ...deliveryUpdateRequest,
      [e.target.name]: e.target.value,
    });

  };



  useEffect(() => {


    const getAllOrders = async () => {

      let allOrders;


      if(orderId){

        allOrders = await retrieveOrdersById();

      }
      else{

        allOrders = await retrieveAllOrders();

      }


      if(allOrders){

        setOrders(allOrders.orders);

      }

    };



    const getAllDeliveryStatus = async () => {

      const status = await retrieveAllDeliveryStatus();

      if(status){

        setDeliveryStatus(status);

      }

    };



    const getAllDeliveryTiming = async () => {

      const timing = await retrieveAllDeliveryTiming();

      if(timing){

        setDeliveryTime(timing);

      }

    };



    getAllOrders();

    getAllDeliveryStatus();

    getAllDeliveryTiming();



  },[orderId]);





  const retrieveAllOrders = async () => {


    const response = await axios.get(

      API +
      "/order/fetch/delivery-wise?deliveryPersonId=" +
      deliveryPerson.id,

      {

        headers:{

          Authorization:
          "Bearer " + delivery_jwtToken

        }

      }

    );


    return response.data;


  };





  const retrieveAllDeliveryStatus = async () => {


    const response = await axios.get(

      API +
      "/order/fetch/delivery-status/all"

    );


    return response.data;


  };





  const retrieveAllDeliveryTiming = async () => {


    const response = await axios.get(

      API +
      "/order/fetch/delivery-time/all"

    );


    return response.data;


  };





  const retrieveOrdersById = async () => {


    const response = await axios.get(

      API +
      "/order/fetch?orderId=" +
      orderId

    );


    return response.data;


  };





  const formatDateFromEpoch = (epochTime)=>{

    const date = new Date(
      Number(epochTime)
    );

    return date.toLocaleString();

  };





  const searchOrderById = (e)=>{

    e.preventDefault();

    setOrderId(tempOrderId);

  };





  const updateDelivery = (orderId)=>{

    setAssignOrderId(orderId);

    handleShow();

  };





  const updateOrderStatus = ()=>{


    deliveryUpdateRequest.orderId =
    assignOrderId;



    fetch(

      API +
      "/order/update/delivery-status",

      {

        method:"PUT",

        headers:{

          Accept:"application/json",

          "Content-Type":"application/json",

          Authorization:
          "Bearer " + delivery_jwtToken

        },


        body:
        JSON.stringify(deliveryUpdateRequest)

      }

    )


    .then((result)=>{


      result.json().then((res)=>{


        if(res.success){


          toast.success(
            res.responseMessage,
            {
              position:"top-center",
              autoClose:1000
            }
          );


          setTimeout(()=>{

            window.location.reload(true);

          },2000);



        }
        else{


          toast.error(
            res.responseMessage,
            {
              position:"top-center",
              autoClose:1000
            }
          );


        }



      });


    })


    .catch(()=>{


      toast.error(
        "It seems server is down",
        {
          position:"top-center",
          autoClose:1000
        }
      );


    });



  };
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

          <h2>My Delivery Orders</h2>

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

                onChange={(e)=>
                  setTempOrderId(e.target.value)
                }

                value={tempOrderId}

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
                orders.map((order)=>{


                  return (

                  <tr key={order.orderId}>


                    <td>
                      <b>{order.orderId}</b>
                    </td>



                    <td>

                      <img

                        src={
                          API +
                          "/product/" +
                          order.product.image1
                        }

                        className="img-fluid"

                        alt="product"

                        style={{
                          maxWidth:"90px"
                        }}

                      />

                    </td>



                    <td>
                      <b>{order.product.name}</b>
                    </td>



                    <td>
                      <b>{order.product.category.name}</b>
                    </td>



                    <td>
                      <b>{order.product.seller.firstName}</b>
                    </td>



                    <td>
                      <b>{order.product.price}</b>
                    </td>



                    <td>
                      <b>{order.quantity}</b>
                    </td>



                    <td>
                      <b>{order.user.firstName}</b>
                    </td>



                    <td>

                      <b>
                        {formatDateFromEpoch(order.orderTime)}
                      </b>

                    </td>



                    <td>
                      <b>{order.status}</b>
                    </td>



                    <td>

                    {
                      order.deliveryPerson ?

                      <b>
                        {order.deliveryPerson.firstName}
                      </b>

                      :

                      <b className="text-danger">
                        Pending
                      </b>
                    }


                    </td>




                    <td>

                    {
                      order.deliveryPerson ?

                      <b>
                        {order.deliveryPerson.phoneNo}
                      </b>

                      :

                      <b className="text-danger">
                        Pending
                      </b>
                    }

                    </td>




                    <td>


                    {

                      order.deliveryDate ?

                      <b>
                        {
                          order.deliveryDate +
                          " " +
                          order.deliveryTime
                        }
                      </b>


                      :

                      <b className="text-danger">
                        Processing
                      </b>


                    }


                    </td>




                    <td>


                    {

                      order.status === "Delivered"


                      ?

                      <b className="text-success">
                        Delivered
                      </b>


                      :


                      <button

                        className="btn btn-sm bg-color custom-bg-text"

                        onClick={()=>
                          updateDelivery(order.orderId)
                        }

                      >

                        Update Status

                      </button>


                    }


                    </td>




                  </tr>


                  )


                })

              }


              </tbody>


            </table>


          </div>


        </div>


      </div>






      <Modal
        show={showModal}
        onHide={handleClose}
      >


        <Modal.Header
          closeButton
          className="bg-color custom-bg-text"
        >

          <Modal.Title>
            Update Delivery Status
          </Modal.Title>


        </Modal.Header>





        <Modal.Body>


          <div className="ms-3 mt-3 mb-3 me-3">


          <form>


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

              <b>Delivery Date</b>

            </label>



            <input

              type="date"

              className="form-control"

              name="deliveryDate"

              onChange={handleInput}

              value={
                deliveryUpdateRequest.deliveryDate
              }

            />


          </div>





          <div className="mb-3">


          <label className="form-label">

            <b>Delivery Time</b>

          </label>



          <select

            name="deliveryTime"

            onChange={handleInput}

            className="form-control"

          >

          <option value="">
            Select Delivery Time
          </option>



          {

          deliveryTime.map((time)=>(

            <option key={time} value={time}>

              {time}

            </option>

          ))

          }


          </select>


          </div>





          <div className="mb-3">


          <label className="form-label">

            <b>Delivery Status</b>

          </label>



          <select

            name="deliveryStatus"

            onChange={handleInput}

            className="form-control"

          >


          <option value="">
            Select Delivery Status
          </option>



          {

          deliveryStatus.map((status)=>(

            <option key={status} value={status}>

              {status}

            </option>

          ))

          }



          </select>


          </div>






          <div className="text-center">


          <button

            type="submit"

            className="btn bg-color custom-bg-text"

            onClick={(e)=>{

              e.preventDefault();

              updateOrderStatus();

            }}

          >

            Update Status

          </button>


          <ToastContainer/>


          </div>



          </form>


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


export default ViewDeliveryOrders;












