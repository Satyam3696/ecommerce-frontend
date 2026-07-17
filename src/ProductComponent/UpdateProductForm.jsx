import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import api from "../services/api";
import API from "../config/apiConfig";

const UpdateProductForm = () => {
  const location = useLocation();
  const product = location.state;

  const [categories, setCategories] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  const navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await api.get("/api/category/fetch/all");
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();

      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    categoryId: product.categoryId,
    sellerId: product.sellerId,
  });

  const handleInput = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await api.put(
        "/api/product/update/detail",
        updatedProduct,
        {
          headers: {
            Authorization: "Bearer " + seller_jwtToken,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/seller/product/all");
        }, 2000);
      } else {
        toast.error(res.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/seller/product/all");
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    }
  };

  const updateProductImage = async (e) => {
    e.preventDefault();

    if (seller === null) {
      toast.error("Seller Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
      });

      return;
    }

    const formData = new FormData();

    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("id", product.id);

    try {
      const response = await api.put(
        "/api/product/update/image",
        formData,
        {
          headers: {
            Authorization: "Bearer " + seller_jwtToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/seller/product/all");
        }, 2000);
      } else {
        toast.error(response.data.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  };

    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 mt-2">
          <div className="card form-card shadow-lg custom-bg">
            <ProductCarousel
              item={{
                image1: product.image1,
                image2: product.image2,
                image3: product.image3,
              }}
            />
          </div>
        </div>

        <div className="col-sm-6 mt-2">
          <div className="card form-card shadow-lg custom-bg">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 text-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 className="card-title">Update Product Details</h5>
              </div>

              <div className="card-body text-color">
                <form className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="title" className="form-label">
                      <b>Product Title</b>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="name"
                      value={updatedProduct.name}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="description" className="form-label">
                      <b>Product Description</b>
                    </label>

                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={updatedProduct.description}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <b>Category</b>
                    </label>

                    <select
                      name="categoryId"
                      className="form-control"
                      value={updatedProduct.categoryId}
                      onChange={handleInput}
                    >
                      <option value="">Select Category</option>

                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="quantity" className="form-label">
                      <b>Product Quantity</b>
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={updatedProduct.quantity}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">
                      <b>Product Price</b>
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={updatedProduct.price}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn bg-color custom-bg-text"
                      onClick={saveProduct}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-3 mt-2">
          <div className="card form-card custom-bg shadow-lg">
            <div className="container-fluid">
              <div
                className="card-header bg-color custom-bg-text mt-2 text-center"
                style={{
                  borderRadius: "1em",
                  height: "38px",
                }}
              >
                <h5 className="card-title">Update Product Image</h5>
              </div>

              <div className="card-body text-color">
                <form className="row">
                  <div className="mb-3">
                    <label htmlFor="image1" className="form-label">
                      <b>Select 1st Image</b>
                    </label>

                    <input
                      className="form-control"
                      type="file"
                      id="image1"
                      name="image1"
                      onChange={(e) => setSelectImage1(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image2" className="form-label">
                      <b>Select 2nd Image</b>
                    </label>

                    <input
                      className="form-control"
                      type="file"
                      id="image2"
                      name="image2"
                      onChange={(e) => setSelectImage2(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image3" className="form-label">
                      <b>Select 3rd Image</b>
                    </label>

                    <input
                      className="form-control"
                      type="file"
                      id="image3"
                      name="image3"
                      onChange={(e) => setSelectImage3(e.target.files[0])}
                    />
                  </div>

                  <div className="d-flex aligns-items-center justify-content-center mb-2">
                    <button
                      type="submit"
                      className="btn bg-color custom-bg-text"
                      onClick={updateProductImage}
                    >
                      Update Image
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;













