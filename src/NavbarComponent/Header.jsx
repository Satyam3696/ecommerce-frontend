import { Link } from "react-router-dom";
import RoleNav from "./RoleNav";
import logo from "../images/e_logo.png";
import { useEffect, useState } from "react";
import api from "../services/api";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const retrieveAllCategories = async () => {
    try {
      const response = await api.get(
        "/category/fetch/all?start=0&count=12"
      );

      return response.data;

    } catch (error) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };


  useEffect(() => {

    const getAllCategories = async () => {

      const allCategories = await retrieveAllCategories();

      if (allCategories) {
        setCategories(allCategories.categories);
      }

    };

    getAllCategories();

  }, []);



  return (

    <div>

      <nav className="navbar navbar-expand-lg custom-bg text-color">

        <div className="container-fluid text-color">


          <img
            src={logo}
            width="65"
            height="auto"
            className="d-inline-block align-top"
            alt="logo"
          />


          <Link to="/" className="navbar-brand">

            <i>

              <b className="text-color ms-2">
                New India Shoping
              </b>

            </i>

          </Link>



          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >

            <span className="navbar-toggler-icon"></span>

          </button>




          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          >



            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


              <li className="nav-item dropdown">


                <a
                  className="nav-link dropdown-toggle text-color"
                  role="button"
                  data-bs-toggle="dropdown"
                >

                  <b>
                    Category
                  </b>

                </a>



                <ul className="dropdown-menu custom-bg text-color">


                  {categories.map((category) => (

                    <li key={category.id}>


                      <Link
                        to={`/product/category/${category.id}/${category.name}`}
                        className="dropdown-item text-center"
                      >

                        <b>
                          {category.name}
                        </b>


                      </Link>


                    </li>


                  ))}


                </ul>


              </li>




              <li className="nav-item">


                <Link
                  to="/aboutus"
                  className="nav-link active"
                >

                  <b className="text-color">
                    About Us
                  </b>

                </Link>


              </li>





              <li className="nav-item">


                <Link
                  to="/contactus"
                  className="nav-link active"
                >

                  <b className="text-color">
                    Contact Us
                  </b>


                </Link>


              </li>



            </ul>




            <RoleNav />


          </div>


        </div>


      </nav>


    </div>

  );

};


export default Header
;