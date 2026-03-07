import React, { useState, useEffect, useContext } from 'react';
import { FaBox, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import classes from './shopperDashboard.module.css';
import LayOut from '../../components/LayOut/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { useProducts } from '../../Utility/ProductContext';
import Loader from '../../components/Loader/Loding';

const ShopperDashboard = () => {
  const [{ user }] = useContext(DataContext);
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [shopperInfo, setShopperInfo] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    description: '',
    category: 'electronics',
    image: '',
    rating: { rate: 0, count: 0 }
  });

  // Load shopper info
  useEffect(() => {
    if (user) {
      const shoppers = JSON.parse(localStorage.getItem('tinamartShoppers') || '[]');
      const shopper = shoppers.find(s => s.email === user.email);
      setShopperInfo(shopper);
    }
  }, [user]);

  // Filter products by shopper
  useEffect(() => {
    if (shopperInfo) {
      const filtered = products.filter(p => p.shopperId === shopperInfo.id);
      setMyProducts(filtered);
    }
  }, [products, shopperInfo]);

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    setProductForm({
      title: '',
      price: '',
      description: '',
      category: 'electronics',
      image: '',
      rating: { rate: 0, count: 0 }
    });
    setShowAddModal(true);
  };

  const handleSaveNewProduct = () => {
    if (!productForm.title || !productForm.price || !productForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      title: productForm.title,
      price: parseFloat(productForm.price),
      description: productForm.description,
      category: productForm.category,
      image: productForm.image || 'https://via.placeholder.com/300x300?text=No+Image',
      rating: {
        rate: parseFloat(productForm.rating.rate) || 0,
        count: parseInt(productForm.rating.count) || 0
      },
      shopperId: shopperInfo.id,
      shopperName: shopperInfo.shopName
    };

    addProduct(newProduct);
    setShowAddModal(false);
    setSaveMessage(`✓ Product "${newProduct.title.substring(0, 30)}..." added successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = () => {
    if (!productForm.title || !productForm.price || !productForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedData = {
      title: productForm.title,
      price: parseFloat(productForm.price),
      description: productForm.description,
      category: productForm.category,
      image: productForm.image,
      rating: {
        rate: parseFloat(productForm.rating.rate) || selectedProduct.rating.rate,
        count: parseInt(productForm.rating.count) || selectedProduct.rating.count
      }
    };

    updateProduct(selectedProduct.id, updatedData);
    setShowEditModal(false);
    setSaveMessage(`✓ Product "${productForm.title.substring(0, 30)}..." updated successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
      setSaveMessage(`✓ Product deleted successfully!`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!shopperInfo) {
    return (
      <LayOut>
        <div className={classes.error_container}>
          <h2>Access Denied</h2>
          <p>You are not registered as a shopper. Please contact the admin.</p>
        </div>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <div className={classes.shopper_dashboard}>
        <div className={classes.dashboard_header}>
          <div className={classes.shop_info}>
            {shopperInfo.logo && (
              <img src={shopperInfo.logo} alt={shopperInfo.shopName} className={classes.shop_logo} />
            )}
            <div>
              <h1>{shopperInfo.shopName}</h1>
              <p>Welcome, {shopperInfo.ownerName}!</p>
            </div>
          </div>
          <span className={`${classes.status_badge} ${classes[shopperInfo.status]}`}>
            {shopperInfo.status}
          </span>
        </div>

        {saveMessage && (
          <div className={classes.save_message}>{saveMessage}</div>
        )}

        <div className={classes.stats_grid}>
          <div className={classes.stat_card}>
            <FaBox className={classes.stat_icon} />
            <div>
              <h3>{myProducts.length}</h3>
              <p>My Products</p>
            </div>
          </div>
          <div className={classes.stat_card}>
            <MdDashboard className={classes.stat_icon} />
            <div>
              <h3>{myProducts.reduce((sum, p) => sum + p.rating.count, 0)}</h3>
              <p>Total Sales</p>
            </div>
          </div>
        </div>

        <div className={classes.products_section}>
          <div className={classes.section_header}>
            <h2>My Products</h2>
            <button className={classes.add_button} onClick={handleAddProduct}>
              <FaPlus /> Add New Product
            </button>
          </div>

          {myProducts.length === 0 ? (
            <div className={classes.no_products}>
              <p>You haven't added any products yet.</p>
              <button className={classes.add_button} onClick={handleAddProduct}>
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className={classes.products_grid}>
              {myProducts.map((product) => (
                <div key={product.id} className={classes.product_card}>
                  <img src={product.image} alt={product.title} />
                  <div className={classes.product_info}>
                    <h3>{product.title}</h3>
                    <p className={classes.category}>{product.category}</p>
                    <p className={classes.price}>${product.price}</p>
                    <div className={classes.product_actions}>
                      <button onClick={() => handleEditProduct(product)} title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteProduct(product)} title="Delete" className={classes.delete_btn}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <div className={classes.modal_overlay} onClick={() => setShowAddModal(false)}>
            <div className={classes.modal_content} onClick={(e) => e.stopPropagation()}>
              <div className={classes.modal_header}>
                <h2>Add New Product</h2>
                <button className={classes.modal_close} onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className={classes.modal_body}>
                <div className={classes.form_group}>
                  <label>Product Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={productForm.title}
                    onChange={handleProductFormChange}
                    placeholder="Enter product title"
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Category *</label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductFormChange}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                </div>

                <div className={classes.form_group}>
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={productForm.image}
                    onChange={handleProductFormChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    placeholder="Enter product description"
                    rows="4"
                  ></textarea>
                </div>

                <div className={classes.modal_actions}>
                  <button className={classes.modal_button_primary} onClick={handleSaveNewProduct}>
                    Add Product
                  </button>
                  <button className={classes.modal_button} onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditModal && selectedProduct && (
          <div className={classes.modal_overlay} onClick={() => setShowEditModal(false)}>
            <div className={classes.modal_content} onClick={(e) => e.stopPropagation()}>
              <div className={classes.modal_header}>
                <h2>Edit Product</h2>
                <button className={classes.modal_close} onClick={() => setShowEditModal(false)}>×</button>
              </div>
              <div className={classes.modal_body}>
                <div className={classes.form_group}>
                  <label>Product Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={productForm.title}
                    onChange={handleProductFormChange}
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    step="0.01"
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Category *</label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductFormChange}
                  >
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                </div>

                <div className={classes.form_group}>
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={productForm.image}
                    onChange={handleProductFormChange}
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    rows="4"
                  ></textarea>
                </div>

                <div className={classes.modal_actions}>
                  <button className={classes.modal_button_primary} onClick={handleUpdateProduct}>
                    Update Product
                  </button>
                  <button className={classes.modal_button} onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default ShopperDashboard;
