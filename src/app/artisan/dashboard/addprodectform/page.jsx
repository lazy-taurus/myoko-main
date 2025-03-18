import React, { useState } from 'react';
import axios from 'axios';

const AddProductDialog = ({ isOpen, onClose, artisanId }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'jewelry',
    imagesBase64: [],
    inStock: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    const imagesBase64 = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagesBase64.push(reader.result.split(',')[1]); // Convert to Base64
        if (imagesBase64.length === files.length) {
          setProductData({
            ...productData,
            imagesBase64,
          });
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/product/product-resister', {
        ...productData,
        artisanId,
      });

      if (response.data.success) {
        onClose(); // Close the dialog
        alert('Product added successfully!');
      } else {
        setError('Failed to add product');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Product Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="jewelry">Jewelry</option>
              <option value="clothing">Clothing</option>
              <option value="home-decor">Home Decor</option>
              <option value="art">Art</option>
              <option value="accessories">Accessories</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Product Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
              multiple
              accept="image/*"
            />
          </div>

          {/* In Stock */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">In Stock</label>
            <select
              name="inStock"
              value={productData.inStock}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDialog;