import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProductApi, getAllProductsApi } from '../apis/api';
import { Toastify } from 'toastify';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Admindashboard = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('Flower');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsApi().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const handleImageUpload = (event) => {
    const files = event.target.files[0];
    setProductImage(files);
    setPreviewImage(URL.createObjectURL(files));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    formData.append('productDescription', productDescription);
    formData.append('productImage', productImage);

    createProductApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('Server error');
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDialog) {
      return;
    } else {
      deleteProductApi(id).then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  return (
    <div style={{paddingTop:"100px"}}>
      <div className="d-flex justify-content-between m-3 align-items-center">
        <h1>Welcome to Admin Dashboard!</h1>

        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Product +
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >

<div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create new product
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <label>Product Name</label>
                  <input
                    onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter product name"
                  />

<label>Product Price</label>
                  <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter product price"
                  />

                  <label>Product Category</label>
                  <select
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="form-control"
                  >
                    <option value="Wedding and reception">Wedding and reception</option>
                    <option value="Seminars and conference">Seminars and conference</option>
                    <option value="birthdays abd celebration">birthdays abd celebration</option>
                    
                  </select>

                  <label>Product Description</label>
                  <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="form-control"
                    rows="3"
                    placeholder="Enter location and  description"
                  ></textarea>

                  <label>Product Image</label>
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    className="form-control mb-2"
                    placeholder="Enter product image"
                  />

                  {previewImage && (
                    <img
                      src={previewImage}
                      className="img-fluid rounded object fit-cover"
                      alt="product image"
                    />
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table m-2">
        <thead className="table-dark">
          <tr>
            <th>Product Images</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Category</th>
            <th>Product Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.productImageUrl} width={'130'} height={'80'} alt="" />
              </td>
              <td>{item.productName}</td>
              <td>Rs.{item.productPrice}</td>
              <td>{item.productCategory}</td>
              <td>{item.productDescription.slice(0, 20)}</td>
              <td>
                <div className="btn-group" role="group">
                  <Link to={`/admin/edit/${item._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admindashboard;
