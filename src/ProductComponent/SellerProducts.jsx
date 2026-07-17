import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductComponent/ProductCard";
import API from "../config/apiConfig";

const SellerProducts = () => {
  const location = useLocation();
  const seller = location.state;

  const { categoryId, sellerName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (categoryId == null) {
          // Fetch all products of seller
          response = await axios.get(
            `${API.PRODUCT}/fetch/seller-wise?sellerId=${seller.id}`
          );
        } else {
          // Fetch seller products by category
          response = await axios.get(
            `${API.PRODUCT}/fetch/seller-wise/category-wise?sellerId=${seller.id}&categoryId=${categoryId}`
          );
        }

        if (response.data) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [seller, categoryId]);

  return (
    <div className="container-fluid mb-2">
      <div
        className="bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "1em",
          height: "38px",
        }}
      >
        <h5 className="card-title ms-3">
          Seller Name: {sellerName}
        </h5>
      </div>

      <div className="col-md-12 mt-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              item={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;














