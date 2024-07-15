import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProductApi, getAllProductsApi } from '../apis/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../style/Admindashbord.css';

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
          setProducts([...products, res.data.product]);
          // Clear form fields after successful submission
          setProductName('');
          setProductPrice('');
          setProductCategory('Flower');
          setProductDescription('');
          setProductImage(null);
          setPreviewImage(null);
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
          setProducts(products.filter(product => product._id !== id));
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="content" style={{ paddingTop: '95px' }}>
        <div className="header">
        <h1 className="mb-4" style={{ fontSize: '2rem' }}>Welcome to Admin Dashboard!</h1>
          <button
            type="button"
            className="btn btn-success btn-sm mb-4"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create new product</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter product name"
                      value={productName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Price</label>
                    <input
                      onChange={(e) => setProductPrice(e.target.value)}
                      type="number"
                      className="form-control"
                      placeholder="Enter product price"
                      value={productPrice}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Category</label>
                    <select onChange={(e) => setProductCategory(e.target.value)} className="form-control">
                      <option value="Wedding and reception">Wedding and reception</option>
                      <option value="Seminars and conference">Seminars and conference</option>
                      <option value="birthdays and celebration">Birthdays and celebration</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Description</label>
                    <textarea
                      onChange={(e) => setProductDescription(e.target.value)}
                      className="form-control"
                      rows="3"
                      placeholder="Enter location and description"
                      value={productDescription}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <input onChange={handleImageUpload} type="file" className="form-control" />
                    {previewImage && (
                      <img src={previewImage} className="img-fluid rounded mt-2" style={{ maxWidth: '100%', height: 'auto' }} alt="product preview" />
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive mt-4">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Product Image</th>
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
                  <td><img src={item.productImageUrl} width={'130'} height={'80'} alt="" /></td>
                  <td>{item.productName}</td>
                  <td>Rs.{item.productPrice}</td>
                  <td>{item.productCategory}</td>
                  <td>{item.productDescription.slice(0, 20)}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link to={`/admin/edit/${item._id}`} className="btn btn-primary btn-sm">Edit</Link>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
