import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../config/apiConfig";

const AddProductForm = () => {

  const [categories, setCategories] = useState([]);

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  const navigate = useNavigate();


  const retrieveAllCategories = async () => {
    const response = await axios.get(
      API.CATEGORY + "/fetch/all"
    );

    return response.data;
  };


  useEffect(() => {

    const getAllCategories = async () => {

      const resCategory = await retrieveAllCategories();

      if(resCategory){
        setCategories(resCategory.categories);
      }

    };

    getAllCategories();

  },[]);



  const [selectedImage1,setSelectImage1] = useState(null);
  const [selectedImage2,setSelectImage2] = useState(null);
  const [selectedImage3,setSelectImage3] = useState(null);


  const [product,setProduct] = useState({

    name:"",
    description:"",
    price:"",
    quantity:"",
    categoryId:""

  });



  const handleInput=(e)=>{

    setProduct({

      ...product,
      [e.target.name]:e.target.value

    });

  };



  const saveProduct=(e)=>{

    e.preventDefault();


    if(seller===null){

      toast.error("Seller Id is missing!!!");
      return;

    }



    const formData=new FormData();


    formData.append("image1",selectedImage1);
    formData.append("image2",selectedImage2);
    formData.append("image3",selectedImage3);

    formData.append("name",product.name);
    formData.append("description",product.description);
    formData.append("price",product.price);
    formData.append("quantity",product.quantity);
    formData.append("categoryId",product.categoryId);
    formData.append("sellerId",seller.id);



    axios.post(
      API.PRODUCT + "/add",
      formData,
      {
        headers:{
          Authorization:"Bearer "+seller_jwtToken
        }
      }
    )

    .then((resp)=>{


      let response=resp.data;


      if(response.success){


        toast.success(response.responseMessage);


        setTimeout(()=>{

          navigate("/home");

        },2000);


      }

      else{

        toast.error(response.responseMessage);

      }


    })


    .catch((error)=>{

      console.log(error);

      toast.error("Server is down");

    });


  };




return (

<div>

<div className="mt-2 d-flex align-items-center justify-content-center">


<div className="card form-card custom-bg shadow-lg"
style={{width:"45rem"}}>


<div className="container-fluid">


<div className="card-header bg-color custom-bg-text mt-2 text-center">

<h5>Add Product</h5>

</div>



<div className="card-body text-color">


<form className="row g-3">



<div className="col-md-6">

<label className="form-label">
<b>Product Title</b>
</label>


<input

type="text"
className="form-control"
name="name"
value={product.name}
onChange={handleInput}

/>

</div>




<div className="col-md-6">

<label className="form-label">
<b>Description</b>
</label>


<textarea

className="form-control"
name="description"
value={product.description}
onChange={handleInput}

/>


</div>




<div className="col-md-6">

<label className="form-label">

<b>Category</b>

</label>



<select

name="categoryId"
className="form-control"
onChange={handleInput}


>

<option>Select Category</option>


{

categories.map((category)=>(

<option key={category.id} value={category.id}>

{category.name}

</option>


))

}


</select>


</div>





<div className="col-md-6">

<label className="form-label">
<b>Quantity</b>
</label>


<input

type="number"
className="form-control"
name="quantity"
value={product.quantity}
onChange={handleInput}

/>


</div>





<div className="col-md-6">

<label className="form-label">
<b>Price</b>
</label>


<input

type="number"
className="form-control"
name="price"
value={product.price}
onChange={handleInput}

/>


</div>






<div className="col-md-6">

<label className="form-label">

<b>Select Image 1</b>

</label>


<input

type="file"
className="form-control"

onChange={(e)=>setSelectImage1(e.target.files[0])}

/>


</div>




<div className="col-md-6">

<label className="form-label">

<b>Select Image 2</b>

</label>


<input

type="file"
className="form-control"

onChange={(e)=>setSelectImage2(e.target.files[0])}

/>


</div>





<div className="col-md-6">

<label className="form-label">

<b>Select Image 3</b>

</label>


<input

type="file"
className="form-control"

onChange={(e)=>setSelectImage3(e.target.files[0])}

/>


</div>





<div className="d-flex justify-content-center">


<button

className="btn bg-color custom-bg-text"

onClick={saveProduct}

>

Add Product

</button>


<ToastContainer/>


</div>



</form>


</div>


</div>


</div>


</div>


</div>


);


};


export default AddProductForm;
















