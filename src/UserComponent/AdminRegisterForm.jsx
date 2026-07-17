import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AdminRegisterForm = () => {

  let navigate = useNavigate();

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");


  const [registerRequest, setRegisterRequest] = useState({});



  const handleUserInput = (e) => {

    setRegisterRequest({
      ...registerRequest,
      [e.target.name]: e.target.value,
    });

  };



  const registerAdmin = (e) => {

    e.preventDefault();



    api
      .post(
        "/api/user/admin/register",
        registerRequest,
        {
          headers: {
            Authorization: "Bearer " + admin_jwtToken,
          },
        }
      )


      .then((res) => {


        console.log("response", res);


        const data = res.data;



        if (data.success) {



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

            navigate("/home");

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



          setTimeout(() => {

            window.location.reload(true);

          }, 1000);



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
          className="form-card border-color custom-bg mb-2"
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
                Admin Register
              </h4>


            </div>




            <div className="card-body mt-3">


              <form>


                <div className="mb-3 text-color">


                  <label htmlFor="emailId" className="form-label">

                    <b>Email Id</b>

                  </label>



                  <input

                    type="email"

                    className="form-control"

                    id="email"

                    name="emailId"

                    onChange={handleUserInput}

                    value={registerRequest.emailId || ""}

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

                    value={registerRequest.password || ""}

                    autoComplete="on"

                  />


                </div>





                <div className="d-flex aligns-items-center justify-content-center">


                  <button

                    type="submit"

                    className="btn bg-color custom-bg-text mb-2"

                    onClick={registerAdmin}

                  >

                    Register

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


export default AdminRegisterForm;


















