import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({
      ...loginRequest,
      [e.target.name]: e.target.value,
    });
  };


  const loginAction = (e) => {
    e.preventDefault();

    api
      .post("/api/user/login", loginRequest)
      .then((res) => {

        console.log("response", res);

        const data = res.data;


        if (data.success) {

          console.log("Got the success response");


          if (data.jwtToken !== null) {


            if (data.user.role === "Admin") {

              sessionStorage.setItem(
                "active-admin",
                JSON.stringify(data.user)
              );

              sessionStorage.setItem(
                "admin-jwtToken",
                data.jwtToken
              );


            } else if (data.user.role === "Customer") {


              sessionStorage.setItem(
                "active-customer",
                JSON.stringify(data.user)
              );

              sessionStorage.setItem(
                "customer-jwtToken",
                data.jwtToken
              );


            } else if (data.user.role === "Seller") {


              sessionStorage.setItem(
                "active-seller",
                JSON.stringify(data.user)
              );

              sessionStorage.setItem(
                "seller-jwtToken",
                data.jwtToken
              );


            } else if (data.user.role === "Delivery") {


              sessionStorage.setItem(
                "active-delivery",
                JSON.stringify(data.user)
              );

              sessionStorage.setItem(
                "delivery-jwtToken",
                data.jwtToken
              );

            }

          }



          if (data.jwtToken !== null) {


            toast.success(data.responseMessage, {

              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,

            });


            setTimeout(() => {

              window.location.href = "/home";

            }, 1000);



          } else {


            toast.error(data.responseMessage, {

              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,

            });


          }



        } else {


          toast.error(data.responseMessage, {

            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

          });


        }


      })


      .catch((error) => {

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


      });

  };



  return (

    <div>

      <div className="mt-2 d-flex aligns-items-center justify-content-center">


        <div
          className="form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >


          <div className="container-fluid">


            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >

              <h4 className="card-title">
                User Login
              </h4>


            </div>



            <div className="card-body mt-3">


              <form>


                <div className="mb-3 text-color">


                  <label htmlFor="role" className="form-label">

                    <b>User Role</b>

                  </label>



                  <select

                    onChange={handleUserInput}
                    className="form-control"
                    name="role"

                  >

                    <option value="0">
                      Select Role
                    </option>


                    <option value="Admin">
                      Admin
                    </option>


                    <option value="Customer">
                      Customer
                    </option>


                    <option value="Seller">
                      Seller
                    </option>


                    <option value="Delivery">
                      Delivery Person
                    </option>


                  </select>


                </div>





                <div className="mb-3 text-color">


                  <label htmlFor="emailId" className="form-label">

                    <b>Email Id</b>

                  </label>



                  <input

                    type="email"

                    className="form-control"

                    id="emailId"

                    name="emailId"

                    onChange={handleUserInput}

                    value={loginRequest.emailId}

                  />


                </div>





                <div className="mb-3 text-color">


                  <label htmlFor="password" className="form-label">

                    <b>Password</b>

                  </label>



                  <input

                    type="password"

                    className="form-control"

                    id="password"

                    name="password"

                    onChange={handleUserInput}

                    value={loginRequest.password}

                    autoComplete="on"

                  />


                </div>





                <div className="d-flex aligns-items-center justify-content-center mb-2">


                  <button

                    type="submit"

                    className="btn bg-color custom-bg-text"

                    onClick={loginAction}

                  >

                    Login

                  </button>


                </div>



                <ToastContainer />


              </form>


            </div>


          </div>


        </div>


      </div>


    </div>

  );

};


export default UserLoginForm;







