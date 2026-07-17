import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

const UpdateCategoryForm = () => {

  const location = useLocation();

  const category = location.state;

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");


  const [id, setId] = useState(category.id);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);



  let navigate = useNavigate();




  const saveCategory = (e) => {

    e.preventDefault();


    let data = {
      id,
      name,
      description,
    };



    api
      .put(
        "/api/category/update",
        data,
        {
          headers: {
            Authorization: "Bearer " + admin_jwtToken,
          },
        }
      )


      .then((res) => {


        const response = res.data;



        if (response.success) {



          toast.success(response.responseMessage, {

            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

          });



          setTimeout(() => {

            navigate("/admin/category/all");

          }, 2000);



        } else {



          toast.error(response.responseMessage, {

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

          }, 2000);



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



        setTimeout(() => {

          window.location.reload(true);

        }, 1000);



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

              <h5 className="card-title">
                Update Category
              </h5>


            </div>




            <div className="card-body text-color mt-3">


              <form>


                <div className="mb-3">


                  <label htmlFor="title" className="form-label">

                    <b>Category Title</b>

                  </label>



                  <input

                    type="text"

                    className="form-control"

                    id="title"

                    placeholder="enter title.."

                    onChange={(e) => {

                      setName(e.target.value);

                    }}

                    value={name}

                  />


                </div>





                <div className="mb-3">


                  <label htmlFor="description" className="form-label">

                    <b>Category Description</b>

                  </label>



                  <textarea

                    className="form-control"

                    id="description"

                    rows="3"

                    placeholder="enter description.."

                    onChange={(e) => {

                      setDescription(e.target.value);

                    }}

                    value={description}

                  />


                </div>





                <div className="d-flex aligns-items-center justify-content-center mb-2">


                  <button

                    type="submit"

                    onClick={saveCategory}

                    className="btn bg-color custom-bg-text"

                  >

                    Update Category

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


export default UpdateCategoryForm;








