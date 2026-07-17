import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../ProductComponent/ProductCard";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";

const HomePage = () => {
  const { categoryId } = useParams();

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (!categoryId && searchText === "") {
          // Fetch all products
          response = await api.get("/api/product/fetch/all");
        } else if (searchText) {
          // Search product by name
          response = await api.get(
            `/api/product/search?productName=${searchText}`
          );
        } else {
          // Fetch products by category
          response = await api.get(
            `/api/product/fetch/category-wise?categoryId=${categoryId}`
          );
        }

        if (response.data) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [categoryId, searchText]);

  const searchProducts = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="d-flex align-items-center justify-content-center mt-5">
        <form className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="Enter Product Name..."
              value={tempSearchText}
              onChange={(e) => setTempSearchText(e.target.value)}
              style={{ width: "350px" }}
              required
            />
          </div>

          <div className="col-auto">
            <button
              type="submit"
              className="btn bg-color custom-bg-text mb-3"
              onClick={searchProducts}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-12 mt-3 mb-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => (
            <ProductCard item={product} key={product.id} />
          ))}
        </div>
      </div>

      <hr />

      <Footer />
    </div>
  );
};

export default HomePage;












