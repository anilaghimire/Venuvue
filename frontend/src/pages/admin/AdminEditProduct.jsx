// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getSingleProductApi, updateProductApi } from '../../apis/api';
// import { toast } from 'react-toastify';




// const AdminEditProduct = () => {
//   //recieve product id from url
//   const { id } = useParams();

//   //navigator
//   const navigate = useNavigate();
//   //use effect to fetch product details
//   useEffect(() => {
//     //making api call
//     getSingleProductApi(id).then((res) => {
//       console.log(res.data);
//       setProductName(res.data.product.productName);
//       setProductCategory(res.data.product.productCategory);
//       setProductPrice(res.data.product.productPrice);
//       setProductDescription(res.data.product.productDescription);
//       setOldImage(res.data.product.productImageUrl);
//     });
//   }, [id]);

//   // make usestate
//   const [productName, setProductName] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productDescription, setProductDescription] = useState("");

//   // make useState for image
//   const [productImage, setProductImage] = useState(null);
//   const [PreviewImage, setPreviewImage] = useState(null);
//   const [oldImage, setOldImage] = useState("");

//   // handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setProductImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   // handle submit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (
//       !productName ||
//       !productPrice ||
//       !productCategory ||
//       !productDescription ||
//       !productImage
//     ) {
//       alert("Please fill in all fields");
//       return;
//     }

//     // Logical form data
//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("productPrice", productPrice);
//     formData.append("productCategory", productCategory);
//     formData.append("productDescription", productDescription);
//     formData.append("productImage", productImage);

//     // Making API call
//     updateProductApi(id, formData)
//       .then((res) => {
//         if (res.data.success === false) {
//           toast.success(res.data.message);
//           navigate('/admin/dashboard')
//         } else {
//           toast.success(res.data.message);
//         }
//       })
//       .catch((error) => {
//         console.log(error); // Log the error for debugging
//         alert("Server error. Please try again later."); // Display a generic error message
//       });
//   };
//   return (
//     <>
    
        
//       <div>
//         <h2 className="m-4">
//           Updating product for{" "}
//           <span className="txt-danger">'{productName}'</span>
//         </h2>
//         <div className="d-flex m-4 gap-4">
//           <div className="">
//             <form>
//               <label className="mb-1">Product Name</label>
//               <input
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Enter Product name"
//               />

//               <label className="mb-1">Product Category</label>
//               <select
//                 value={productCategory}
//                 onChange={(e) => setProductCategory(e.target.value)}
//                 className="form-control"
//                 id=""
//               >
//                 <option className="Jacket">Jacket</option>
//                 <option className="T-shirt">T-shirt</option>
//                 <option className="Pants">Pants</option>
//               </select>

//               <label className="mb-1">Price</label>
//               <input
//                 value={productPrice}
//                 onChange={(e) => setProductPrice(e.target.value)}
//                 className="form-control mb-2"
//                 type="number"
//                 placeholder="Enter Product Price"
//               />

//               <label className="mb-1">Product Description</label>
//               <textarea
//                 value={productDescription}
//                 onChange={(e) => setProductDescription(e.target.value)}
//                 cols={3}
//                 className="form-control mb-2"
//                 type="text"
//                 placeholder="Write Product Description"
//               />

//               <label className="mb-1">Product Image</label>
//               <input
//                 onChange={handleImageUpload}
//                 type="file"
//                 className="form-control mb-2"
//               />

//               <button
//                 className="btn btn-primary w-100 mt-2"
//                 onClick={handleSubmit}
//               >
//                 Update Product
//               </button>
//             </form>
//           </div>

//           <div>
//             <h6>Old Image</h6>
//             <img
//               src={oldImage}
//               className="object-fit cover rounded-3"
//               alt=""
//               height={220}
//               width={200}
//             />
//             <hr />
//             <h6>New Image</h6>
//             {PreviewImage && (
//               <>
//                 <img
//                   src={PreviewImage}
//                   className="mt-3"
//                   alt=""
//                   height={220}
//                   width={200}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminEditProduct;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProductApi, updateProductApi } from '../../apis/api';
import { toast } from 'react-toastify';

const AdminEditProduct = () => {
  // Receive product id from url
  const { id } = useParams();

  // Navigator
  const navigate = useNavigate();

  // UseEffect to fetch product details
  useEffect(() => {
    // Making api call
    getSingleProductApi(id).then((res) => {
      console.log(res.data);
      setProductName(res.data.product.productName);
      setProductCategory(res.data.product.productCategory);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setOldImage(res.data.product.productImageUrl);
    });
  }, [id]);

  // Make useState
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // Make useState for image
  const [productImage, setProductImage] = useState(null);
  const [PreviewImage, setPreviewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !productImage
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Logical form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);

    // Making API call
    updateProductApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.success(res.data.message);
          navigate('/admin/dashboard')
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error); // Log the error for debugging
        alert("Server error. Please try again later."); // Display a generic error message
      });
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="m-4">
        <h2>
          Updating product for <span className="text-danger">'{productName}'</span>
        </h2>
        <div className="d-flex m-4 gap-4">
          <div className="">
            <form>
              <label className="mb-1">Product Name</label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                className="form-control mb-2"
                placeholder="Enter Product name"
              />

              <label className="mb-1">Product Category</label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="form-control"
              >
                <option value="Wedding and reception">Wedding and reception</option>
                <option value="Seminars and conference">Seminars and conference</option>
                <option value="birthdays and celebration">birthdays abd celebration</option>
              </select>

              <label className="mb-1">Price</label>
              <input
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="form-control mb-2"
                type="number"
                placeholder="Enter Product Price"
              />

              <label className="mb-1">Product Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                cols={3}
                className="form-control mb-2"
                placeholder="Write Product Description"
              />

              <label className="mb-1">Product Image</label>
              <input
                onChange={handleImageUpload}
                type="file"
                className="form-control mb-2"
              />

              <button
                className="btn btn-primary w-100 mt-2"
                onClick={handleSubmit}
              >
                Update Product
              </button>
            </form>
          </div>

          <div>
            <h6>Old Image</h6>
            <img
              src={oldImage}
              className="object-fit-cover rounded-3"
              alt=""
              height={220}
              width={200}
            />
            <hr />
            <h6>New Image</h6>
            {PreviewImage && (
              <img
                src={PreviewImage}
                className="mt-3"
                alt=""
                height={220}
                width={200}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
