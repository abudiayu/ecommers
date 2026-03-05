import React, { useState, useEffect, useContext } from 'react';
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign, FaChartLine, FaCog, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { MdDashboard, MdInventory } from 'react-icons/md';
import classes from './admin.module.css';
import LayOut from '../../components/LayOut/LayOut';
import axios from 'axios';
import { DataContext } from '../../components/DataProvider/DataProvider';
import Loader from '../../components/Loader/Loding';
import { useSettings } from '../../Utility/SettingsContext';
import { useProducts } from '../../Utility/ProductContext';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct, undo, canUndo } = useProducts();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [{ basket, user }] = useContext(DataContext);
  const { settings, updateSettings, resetSettings } = useSettings();
  
  // Form state for settings
  const [formData, setFormData] = useState(settings);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form states for add/edit product
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  });

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersRes = await axios.get('https://fakestoreapi.com/users');
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    updateSettings(formData);
    setSaveMessage('✓ Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings();
      setFormData(settings);
      setSaveMessage('✓ Settings reset to defaults!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancelSettings = () => {
    setFormData(settings);
    setSaveMessage('✓ Changes cancelled!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Product actions
  const handleViewProduct = (product) => {
    setSelectedItem(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedItem(product);
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

  const handleDeleteProduct = (product) => {
    setSelectedItem(product);
    setShowDeleteModal(true);
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

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
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
      }
    };

    const added = addProduct(newProduct);
    setShowAddModal(false);
    setSaveMessage(`✓ Product "${added.title.substring(0, 30)}..." added successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
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
        rate: parseFloat(productForm.rating.rate) || selectedItem.rating.rate,
        count: parseInt(productForm.rating.count) || selectedItem.rating.count
      }
    };

    updateProduct(selectedItem.id, updatedData);
    setShowEditModal(false);
    setSaveMessage(`✓ Product "${productForm.title.substring(0, 30)}..." updated successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const confirmDelete = () => {
    deleteProduct(selectedItem.id);
    setShowDeleteModal(false);
    setSaveMessage(`✓ ${selectedItem.title?.substring(0, 30)}... deleted successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleUndo = () => {
    const undoneAction = undo();
    if (undoneAction) {
      let message = '';
      switch (undoneAction.action) {
        case 'add':
          message = `↶ Undone: Product "${undoneAction.product.title.substring(0, 30)}..." addition`;
          break;
        case 'delete':
          message = `↶ Undone: Product "${undoneAction.product.title.substring(0, 30)}..." deletion`;
          break;
        case 'update':
          message = `↶ Undone: Product "${undoneAction.product.title.substring(0, 30)}..." update`;
          break;
        default:
          message = '↶ Action undone';
      }
      setSaveMessage(message);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // User actions
  const handleViewUser = (user) => {
    setSelectedItem(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedItem(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedItem(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(u => u.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSaveMessage(`✓ User ${selectedItem.username} deleted successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, usersRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/users')
        ]);
        setProducts(productsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate real statistics
  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
  const totalOrders = basket?.length || 0;
  const avgOrderValue = products.length > 0 ? (totalRevenue / products.length).toFixed(2) : 0;
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.id % 2 === 0).length; // Simulate active users

  const stats = [
    { title: 'Total Users', value: totalUsers, icon: <FaUsers />, color: '#FFD700', change: '+12%' },
    { title: 'Total Products', value: products.length, icon: <FaBox />, color: '#FFC107', change: '+8%' },
    { title: 'Total Orders', value: totalOrders, icon: <FaShoppingCart />, color: '#FF8C00', change: '+23%' },
    { title: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: <FaDollarSign />, color: '#FFD700', change: '+15%' }
  ];

  // Get top selling products
  const topProducts = products
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 5);

  // Category distribution
  const categoryStats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  if (loading || productsLoading) {
    return <Loader />;
  }

  return (
    <LayOut>
      <div className={classes.admin_container}>
        <div className={classes.sidebar}>
          <h2 className={classes.sidebar_title}>Admin Panel</h2>
          <ul className={classes.sidebar_menu}>
            <li 
              className={activeTab === 'dashboard' ? classes.active : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <MdDashboard /> Dashboard
            </li>
            <li 
              className={activeTab === 'products' ? classes.active : ''}
              onClick={() => setActiveTab('products')}
            >
              <MdInventory /> Products
            </li>
            <li 
              className={activeTab === 'users' ? classes.active : ''}
              onClick={() => setActiveTab('users')}
            >
              <FaUsers /> Users
            </li>
            <li 
              className={activeTab === 'analytics' ? classes.active : ''}
              onClick={() => setActiveTab('analytics')}
            >
              <FaChartLine /> Analytics
            </li>
            <li 
              className={activeTab === 'settings' ? classes.active : ''}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </li>
          </ul>
        </div>

        <div className={classes.main_content}>
          {saveMessage && (
            <div className={classes.save_message}>
              {saveMessage}
              {canUndo && !saveMessage.includes('Undone') && (
                <button className={classes.inline_undo_button} onClick={handleUndo}>
                  ↶ Undo
                </button>
              )}
            </div>
          )}
          {activeTab === 'dashboard' && (
            <>
              <div className={classes.welcome_banner}>
                <h1 className={classes.page_title}>Welcome back, {user?.email?.split('@')[0] || 'Admin'}! 👋</h1>
                <p className={classes.welcome_text}>Here's what's happening with your store today.</p>
              </div>
              
              <div className={classes.stats_grid}>
                {stats.map((stat, index) => (
                  <div key={index} className={classes.stat_card} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={classes.stat_icon} style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className={classes.stat_info}>
                      <h3>{stat.value}</h3>
                      <p>{stat.title}</p>
                      <span className={classes.change_positive}>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={classes.dashboard_grid}>
                <div className={classes.top_products}>
                  <h2>Top Selling Products</h2>
                  <div className={classes.product_list}>
                    {topProducts.map((product) => (
                      <div key={product.id} className={classes.product_item}>
                        <img src={product.image} alt={product.title} />
                        <div className={classes.product_details}>
                          <h4>{product.title.substring(0, 40)}...</h4>
                          <p className={classes.product_category}>{product.category}</p>
                          <div className={classes.product_stats}>
                            <span className={classes.price}>${product.price}</span>
                            <span className={classes.sales}>{product.rating.count} sales</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={classes.category_stats}>
                  <h2>Category Distribution</h2>
                  <div className={classes.category_chart}>
                    {Object.entries(categoryStats).map(([category, count]) => {
                      const percentage = (count / products.length) * 100;
                      return (
                        <div key={category} className={classes.category_item}>
                          <div className={classes.category_info}>
                            <span className={classes.category_name}>{category}</span>
                            <span className={classes.category_count}>{count} items</span>
                          </div>
                          <div className={classes.progress_bar}>
                            <div 
                              className={classes.progress_fill} 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className={classes.percentage}>{percentage.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={classes.quick_stats}>
                <div className={classes.quick_stat_item}>
                  <h3>Average Product Price</h3>
                  <p className={classes.stat_value}>${avgOrderValue}</p>
                </div>
                <div className={classes.quick_stat_item}>
                  <h3>Total Categories</h3>
                  <p className={classes.stat_value}>{Object.keys(categoryStats).length}</p>
                </div>
                <div className={classes.quick_stat_item}>
                  <h3>Active Users</h3>
                  <p className={classes.stat_value}>{activeUsers}</p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className={classes.tab_content}>
              <div className={classes.tab_header}>
                <h1 className={classes.page_title}>Product Management ({products.length} Products)</h1>
                <div className={classes.header_actions}>
                  {canUndo && (
                    <button className={classes.undo_button} onClick={handleUndo} title="Undo last action">
                      ↶ Undo
                    </button>
                  )}
                  <button className={classes.add_button} onClick={handleAddProduct}>
                    + Add New Product
                  </button>
                </div>
              </div>
              
              <div className={classes.products_grid}>
                {products.map((product) => (
                  <div key={product.id} className={classes.product_card}>
                    <img src={product.image} alt={product.title} />
                    <div className={classes.product_card_content}>
                      <h3>{product.title.substring(0, 50)}...</h3>
                      <p className={classes.category_badge}>{product.category}</p>
                      <div className={classes.product_card_footer}>
                        <span className={classes.product_price}>${product.price}</span>
                        <div className={classes.product_actions}>
                          <button 
                            className={classes.action_btn} 
                            onClick={() => handleViewProduct(product)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button 
                            className={classes.action_btn} 
                            onClick={() => handleEditProduct(product)}
                            title="Edit Product"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className={classes.action_btn_danger} 
                            onClick={() => handleDeleteProduct(product)}
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className={classes.tab_content}>
              <h1 className={classes.page_title}>User Management ({users.length} Users)</h1>
              <div className={classes.users_table_container}>
                <table className={classes.users_table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userItem) => (
                      <tr key={userItem.id}>
                        <td>{userItem.id}</td>
                        <td>{userItem.name.firstname} {userItem.name.lastname}</td>
                        <td>{userItem.email}</td>
                        <td>{userItem.username}</td>
                        <td>{userItem.phone}</td>
                        <td>{userItem.address.city}</td>
                        <td>
                          <div className={classes.table_actions}>
                            <button 
                              className={classes.action_btn} 
                              onClick={() => handleViewUser(userItem)}
                              title="View User"
                            >
                              <FaEye />
                            </button>
                            <button 
                              className={classes.action_btn} 
                              onClick={() => handleEditUser(userItem)}
                              title="Edit User"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className={classes.action_btn_danger} 
                              onClick={() => handleDeleteUser(userItem)}
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className={classes.tab_content}>
              <h1 className={classes.page_title}>Analytics & Reports</h1>
              
              {/* Key Metrics Overview */}
              <div className={classes.metrics_overview}>
                <div className={classes.metric_card}>
                  <div className={classes.metric_header}>
                    <h3>Total Revenue</h3>
                    <span className={classes.trend_up}>↑ 15.3%</span>
                  </div>
                  <p className={classes.metric_value}>${totalRevenue.toFixed(2)}</p>
                  <div className={classes.mini_chart}>
                    <div className={classes.bar} style={{ height: '40%' }}></div>
                    <div className={classes.bar} style={{ height: '60%' }}></div>
                    <div className={classes.bar} style={{ height: '45%' }}></div>
                    <div className={classes.bar} style={{ height: '80%' }}></div>
                    <div className={classes.bar} style={{ height: '70%' }}></div>
                    <div className={classes.bar} style={{ height: '90%' }}></div>
                    <div className={classes.bar} style={{ height: '100%' }}></div>
                  </div>
                </div>

                <div className={classes.metric_card}>
                  <div className={classes.metric_header}>
                    <h3>Avg Order Value</h3>
                    <span className={classes.trend_up}>↑ 8.2%</span>
                  </div>
                  <p className={classes.metric_value}>${avgOrderValue}</p>
                  <div className={classes.mini_chart}>
                    <div className={classes.bar} style={{ height: '50%' }}></div>
                    <div className={classes.bar} style={{ height: '55%' }}></div>
                    <div className={classes.bar} style={{ height: '60%' }}></div>
                    <div className={classes.bar} style={{ height: '70%' }}></div>
                    <div className={classes.bar} style={{ height: '75%' }}></div>
                    <div className={classes.bar} style={{ height: '85%' }}></div>
                    <div className={classes.bar} style={{ height: '100%' }}></div>
                  </div>
                </div>

                <div className={classes.metric_card}>
                  <div className={classes.metric_header}>
                    <h3>Conversion Rate</h3>
                    <span className={classes.trend_up}>↑ 12.5%</span>
                  </div>
                  <p className={classes.metric_value}>3.8%</p>
                  <div className={classes.mini_chart}>
                    <div className={classes.bar} style={{ height: '30%' }}></div>
                    <div className={classes.bar} style={{ height: '45%' }}></div>
                    <div className={classes.bar} style={{ height: '55%' }}></div>
                    <div className={classes.bar} style={{ height: '65%' }}></div>
                    <div className={classes.bar} style={{ height: '75%' }}></div>
                    <div className={classes.bar} style={{ height: '90%' }}></div>
                    <div className={classes.bar} style={{ height: '100%' }}></div>
                  </div>
                </div>

                <div className={classes.metric_card}>
                  <div className={classes.metric_header}>
                    <h3>Customer Growth</h3>
                    <span className={classes.trend_up}>↑ 23.1%</span>
                  </div>
                  <p className={classes.metric_value}>{users.length}</p>
                  <div className={classes.mini_chart}>
                    <div className={classes.bar} style={{ height: '35%' }}></div>
                    <div className={classes.bar} style={{ height: '50%' }}></div>
                    <div className={classes.bar} style={{ height: '60%' }}></div>
                    <div className={classes.bar} style={{ height: '75%' }}></div>
                    <div className={classes.bar} style={{ height: '80%' }}></div>
                    <div className={classes.bar} style={{ height: '95%' }}></div>
                    <div className={classes.bar} style={{ height: '100%' }}></div>
                  </div>
                </div>
              </div>

              {/* Main Charts Grid */}
              <div className={classes.charts_grid}>
                {/* Sales by Category - Donut Chart */}
                <div className={classes.chart_card}>
                  <h3>Sales by Category</h3>
                  <div className={classes.donut_chart_container}>
                    <svg viewBox="0 0 200 200" className={classes.donut_chart}>
                      <defs>
                        <filter id="shadow">
                          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      {Object.entries(categoryStats).map(([category, count], index) => {
                        const total = products.length;
                        const percentage = (count / total) * 100;
                        const colors = ['#FFD700', '#FFC107', '#FF8C00', '#FFA500'];
                        const startAngle = Object.entries(categoryStats)
                          .slice(0, index)
                          .reduce((sum, [, c]) => sum + (c / total) * 360, 0);
                        const endAngle = startAngle + (percentage / 100) * 360;
                        
                        const startRad = (startAngle - 90) * Math.PI / 180;
                        const endRad = (endAngle - 90) * Math.PI / 180;
                        
                        const x1 = 100 + 70 * Math.cos(startRad);
                        const y1 = 100 + 70 * Math.sin(startRad);
                        const x2 = 100 + 70 * Math.cos(endRad);
                        const y2 = 100 + 70 * Math.sin(endRad);
                        
                        const largeArc = percentage > 50 ? 1 : 0;
                        
                        // Calculate label position
                        const midAngle = (startAngle + endAngle) / 2;
                        const midRad = (midAngle - 90) * Math.PI / 180;
                        const labelX = 100 + 85 * Math.cos(midRad);
                        const labelY = 100 + 85 * Math.sin(midRad);
                        
                        return (
                          <g key={category} className={classes.donut_segment}>
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={colors[index % colors.length]}
                              opacity="0.9"
                              className={classes.donut_path}
                              filter="url(#shadow)"
                            />
                            {/* Hover tooltip */}
                            <g className={classes.donut_tooltip}>
                              <rect
                                x={labelX - 40}
                                y={labelY - 30}
                                width="80"
                                height="50"
                                rx="8"
                                fill="#1a1a1a"
                                opacity="0.95"
                              />
                              <text
                                x={labelX}
                                y={labelY - 10}
                                textAnchor="middle"
                                fontSize="11"
                                fill="#FFD700"
                                fontWeight="bold"
                                style={{ textTransform: 'capitalize' }}
                              >
                                {category}
                              </text>
                              <text
                                x={labelX}
                                y={labelY + 5}
                                textAnchor="middle"
                                fontSize="13"
                                fill="white"
                                fontWeight="bold"
                              >
                                {count} items
                              </text>
                              <text
                                x={labelX}
                                y={labelY + 20}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#FFD700"
                              >
                                {percentage.toFixed(1)}%
                              </text>
                            </g>
                          </g>
                        );
                      })}
                      <circle cx="100" cy="100" r="45" fill="white" />
                      <text x="100" y="95" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1a1a1a">
                        {products.length}
                      </text>
                      <text x="100" y="110" textAnchor="middle" fontSize="10" fill="#666">
                        Products
                      </text>
                    </svg>
                    <div className={classes.chart_legend}>
                      {Object.entries(categoryStats).map(([category, count], index) => {
                        const colors = ['#FFD700', '#FFC107', '#FF8C00', '#FFA500'];
                        const percentage = ((count / products.length) * 100).toFixed(1);
                        return (
                          <div key={category} className={classes.legend_item}>
                            <span 
                              className={classes.legend_color} 
                              style={{ background: colors[index % colors.length] }}
                            ></span>
                            <span className={classes.legend_text}>
                              {category} ({percentage}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Product Performance - Bar Chart */}
                <div className={classes.chart_card}>
                  <h3>Top Products by Rating</h3>
                  <div className={classes.bar_chart}>
                    {topProducts.map((product, index) => {
                      const percentage = (product.rating.rate / 5) * 100;
                      return (
                        <div key={product.id} className={classes.bar_item}>
                          <div className={classes.bar_label}>
                            <span className={classes.bar_rank}>#{index + 1}</span>
                            <span className={classes.bar_name}>
                              {product.title.substring(0, 25)}...
                            </span>
                          </div>
                          <div className={classes.bar_container}>
                            <div 
                              className={classes.bar_fill} 
                              style={{ width: `${percentage}%` }}
                            >
                              <span className={classes.bar_value}>{product.rating.rate}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Revenue Trend - Line Chart */}
                <div className={classes.chart_card}>
                  <h3>Revenue Trend (Last 7 Days)</h3>
                  <div className={classes.line_chart}>
                    <svg viewBox="0 0 400 200" className={classes.line_svg}>
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line
                          key={i}
                          x1="40"
                          y1={20 + i * 35}
                          x2="380"
                          y2={20 + i * 35}
                          stroke="#f0f0f0"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Line path */}
                      <path
                        d="M 60 140 L 110 100 L 160 120 L 210 80 L 260 90 L 310 60 L 360 40"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className={classes.line_path}
                      />
                      
                      {/* Area under line */}
                      <path
                        d="M 60 140 L 110 100 L 160 120 L 210 80 L 260 90 L 310 60 L 360 40 L 360 160 L 60 160 Z"
                        fill="url(#lineGradient)"
                        className={classes.line_area}
                      />
                      
                      {/* Data points with hover effect */}
                      {[
                        { x: 60, y: 140, value: '$1,200', day: 'Mon' },
                        { x: 110, y: 100, value: '$1,800', day: 'Tue' },
                        { x: 160, y: 120, value: '$1,500', day: 'Wed' },
                        { x: 210, y: 80, value: '$2,100', day: 'Thu' },
                        { x: 260, y: 90, value: '$1,950', day: 'Fri' },
                        { x: 310, y: 60, value: '$2,400', day: 'Sat' },
                        { x: 360, y: 40, value: '$2,800', day: 'Sun' }
                      ].map((point, i) => (
                        <g key={i} className={classes.data_point_group}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            fill="#FFD700"
                            stroke="white"
                            strokeWidth="2"
                            className={classes.data_point}
                          />
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="8"
                            fill="transparent"
                            className={classes.data_point_hover}
                          />
                          {/* Tooltip */}
                          <g className={classes.tooltip_group}>
                            <rect
                              x={point.x - 35}
                              y={point.y - 45}
                              width="70"
                              height="35"
                              rx="6"
                              fill="#1a1a1a"
                              opacity="0.95"
                            />
                            <text
                              x={point.x}
                              y={point.y - 30}
                              textAnchor="middle"
                              fontSize="11"
                              fill="#FFD700"
                              fontWeight="bold"
                            >
                              {point.day}
                            </text>
                            <text
                              x={point.x}
                              y={point.y - 17}
                              textAnchor="middle"
                              fontSize="13"
                              fill="white"
                              fontWeight="bold"
                            >
                              {point.value}
                            </text>
                          </g>
                        </g>
                      ))}
                      
                      {/* X-axis labels */}
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                        <text
                          key={day}
                          x={60 + i * 50}
                          y="180"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#666"
                        >
                          {day}
                        </text>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* User Activity Heatmap */}
                <div className={classes.chart_card}>
                  <h3>User Activity Heatmap</h3>
                  <div className={classes.heatmap}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className={classes.heatmap_row}>
                        <span className={classes.heatmap_label}>{day}</span>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => {
                          const intensity = Math.random();
                          return (
                            <div
                              key={hour}
                              className={classes.heatmap_cell}
                              style={{
                                background: `rgba(255, 215, 0, ${intensity})`,
                                border: intensity > 0.7 ? '2px solid #FFD700' : '1px solid #f0f0f0'
                              }}
                              title={`${day} ${hour}:00 - Activity: ${(intensity * 100).toFixed(0)}%`}
                            ></div>
                          );
                        })}
                      </div>
                    ))}
                    <div className={classes.heatmap_hours}>
                      {[...Array(12)].map((_, i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className={classes.stats_row}>
                <div className={classes.stat_box}>
                  <h4>Best Selling Category</h4>
                  <p className={classes.stat_highlight}>
                    {Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0][0]}
                  </p>
                  <span className={classes.stat_subtext}>
                    {Object.entries(categoryStats).sort((a, b) => b[1] - a[1])[0][1]} products
                  </span>
                </div>

                <div className={classes.stat_box}>
                  <h4>Highest Rated Product</h4>
                  <p className={classes.stat_highlight}>
                    {products.sort((a, b) => b.rating.rate - a.rating.rate)[0]?.rating.rate}/5
                  </p>
                  <span className={classes.stat_subtext}>
                    {products.sort((a, b) => b.rating.rate - a.rating.rate)[0]?.title.substring(0, 30)}...
                  </span>
                </div>

                <div className={classes.stat_box}>
                  <h4>Most Popular Price Range</h4>
                  <p className={classes.stat_highlight}>$50 - $100</p>
                  <span className={classes.stat_subtext}>
                    {products.filter(p => p.price >= 50 && p.price <= 100).length} products
                  </span>
                </div>

                <div className={classes.stat_box}>
                  <h4>Customer Satisfaction</h4>
                  <p className={classes.stat_highlight}>94.5%</p>
                  <span className={classes.stat_subtext}>Based on ratings</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={classes.tab_content}>
              <h1 className={classes.page_title}>Settings</h1>
              
              <div className={classes.settings_container}>
                {/* Store Information */}
                <div className={classes.settings_card}>
                  <div className={classes.settings_header}>
                    <h3>Store Information</h3>
                    <p>Manage your store's basic information</p>
                  </div>
                  <div className={classes.settings_body}>
                    <div className={classes.setting_row}>
                      <div className={classes.setting_item}>
                        <label>Store Name</label>
                        <input 
                          type="text" 
                          name="storeName"
                          value={formData.storeName} 
                          onChange={handleInputChange}
                          placeholder="Enter store name" 
                        />
                      </div>
                      <div className={classes.setting_item}>
                        <label>Store Tagline</label>
                        <input 
                          type="text" 
                          name="storeTagline"
                          value={formData.storeTagline} 
                          onChange={handleInputChange}
                          placeholder="Enter tagline" 
                        />
                      </div>
                    </div>
                    
                    <div className={classes.setting_row}>
                      <div className={classes.setting_item}>
                        <label>Store Email</label>
                        <input 
                          type="email" 
                          name="storeEmail"
                          value={formData.storeEmail} 
                          onChange={handleInputChange}
                          placeholder="store@email.com" 
                        />
                      </div>
                      <div className={classes.setting_item}>
                        <label>Store Phone</label>
                        <input 
                          type="tel" 
                          name="storePhone"
                          value={formData.storePhone} 
                          onChange={handleInputChange}
                          placeholder="+251 XXX XXX XXX" 
                        />
                      </div>
                    </div>
                    
                    <div className={classes.setting_item}>
                      <label>Store Address</label>
                      <textarea 
                        rows="3" 
                        name="storeAddress"
                        value={formData.storeAddress}
                        onChange={handleInputChange}
                        placeholder="Enter full store address"
                      ></textarea>
                    </div>
                    
                    <div className={classes.setting_item}>
                      <label>Store Description</label>
                      <textarea 
                        rows="4" 
                        name="storeDescription"
                        value={formData.storeDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your store"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Business Settings */}
                <div className={classes.settings_card}>
                  <div className={classes.settings_header}>
                    <h3>Business Settings</h3>
                    <p>Configure your business operations</p>
                  </div>
                  <div className={classes.settings_body}>
                    <div className={classes.setting_row}>
                      <div className={classes.setting_item}>
                        <label>Default Currency</label>
                        <select 
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                        >
                          <option value="ETB">ETB - Ethiopian Birr</option>
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                      <div className={classes.setting_item}>
                        <label>Tax Rate (%)</label>
                        <input 
                          type="number" 
                          name="taxRate"
                          value={formData.taxRate} 
                          onChange={handleInputChange}
                          placeholder="0" 
                          step="0.1" 
                        />
                      </div>
                    </div>
                    
                    <div className={classes.setting_row}>
                      <div className={classes.setting_item}>
                        <label>Shipping Fee (ETB)</label>
                        <input 
                          type="number" 
                          name="shippingFee"
                          value={formData.shippingFee} 
                          onChange={handleInputChange}
                          placeholder="0" 
                        />
                      </div>
                      <div className={classes.setting_item}>
                        <label>Free Shipping Threshold (ETB)</label>
                        <input 
                          type="number" 
                          name="freeShippingThreshold"
                          value={formData.freeShippingThreshold} 
                          onChange={handleInputChange}
                          placeholder="0" 
                        />
                      </div>
                    </div>
                    
                    <div className={classes.setting_row}>
                      <div className={classes.setting_item}>
                        <label>Order Processing Time (days)</label>
                        <input 
                          type="number" 
                          name="processingTime"
                          value={formData.processingTime} 
                          onChange={handleInputChange}
                          placeholder="0" 
                        />
                      </div>
                      <div className={classes.setting_item}>
                        <label>Return Period (days)</label>
                        <input 
                          type="number" 
                          name="returnPeriod"
                          value={formData.returnPeriod} 
                          onChange={handleInputChange}
                          placeholder="0" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className={classes.settings_card}>
                  <div className={classes.settings_header}>
                    <h3>Notification Settings</h3>
                    <p>Manage how you receive notifications</p>
                  </div>
                  <div className={classes.settings_body}>
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>Email Notifications</h4>
                        <p>Receive email alerts for new orders and updates</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                    
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>SMS Notifications</h4>
                        <p>Get SMS alerts for urgent matters</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="smsNotifications"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                    
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>Order Notifications</h4>
                        <p>Notify when new orders are placed</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="orderNotifications"
                          checked={formData.orderNotifications}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                    
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>Low Stock Alerts</h4>
                        <p>Alert when product inventory is low</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="lowStockAlerts"
                          checked={formData.lowStockAlerts}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                    
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>Marketing Emails</h4>
                        <p>Receive promotional and marketing updates</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="marketingEmails"
                          checked={formData.marketingEmails}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Settings */}
                <div className={classes.settings_card}>
                  <div className={classes.settings_header}>
                    <h3>Payment Settings</h3>
                    <p>Configure payment methods and gateways</p>
                  </div>
                  <div className={classes.settings_body}>
                    <div className={classes.payment_methods}>
                      <div className={classes.payment_method}>
                        <div className={classes.payment_icon}>💳</div>
                        <div className={classes.payment_details}>
                          <h4>Credit/Debit Cards</h4>
                          <p>Accept Visa, Mastercard, and more</p>
                        </div>
                        <label className={classes.toggle_switch}>
                          <input 
                            type="checkbox" 
                            name="creditCard"
                            checked={formData.creditCard}
                            onChange={handleInputChange}
                          />
                          <span className={classes.toggle_slider}></span>
                        </label>
                      </div>
                      
                      <div className={classes.payment_method}>
                        <div className={classes.payment_icon}>📱</div>
                        <div className={classes.payment_details}>
                          <h4>Mobile Money</h4>
                          <p>M-Pesa, Telebirr, and other mobile payments</p>
                        </div>
                        <label className={classes.toggle_switch}>
                          <input 
                            type="checkbox" 
                            name="mobileMoney"
                            checked={formData.mobileMoney}
                            onChange={handleInputChange}
                          />
                          <span className={classes.toggle_slider}></span>
                        </label>
                      </div>
                      
                      <div className={classes.payment_method}>
                        <div className={classes.payment_icon}>🏦</div>
                        <div className={classes.payment_details}>
                          <h4>Bank Transfer</h4>
                          <p>Direct bank transfers</p>
                        </div>
                        <label className={classes.toggle_switch}>
                          <input 
                            type="checkbox" 
                            name="bankTransfer"
                            checked={formData.bankTransfer}
                            onChange={handleInputChange}
                          />
                          <span className={classes.toggle_slider}></span>
                        </label>
                      </div>
                      
                      <div className={classes.payment_method}>
                        <div className={classes.payment_icon}>💵</div>
                        <div className={classes.payment_details}>
                          <h4>Cash on Delivery</h4>
                          <p>Pay when you receive your order</p>
                        </div>
                        <label className={classes.toggle_switch}>
                          <input 
                            type="checkbox" 
                            name="cashOnDelivery"
                            checked={formData.cashOnDelivery}
                            onChange={handleInputChange}
                          />
                          <span className={classes.toggle_slider}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className={classes.settings_card}>
                  <div className={classes.settings_header}>
                    <h3>Security Settings</h3>
                    <p>Manage your account security</p>
                  </div>
                  <div className={classes.settings_body}>
                    <div className={classes.setting_item}>
                      <label>Current Password</label>
                      <input type="password" placeholder="Enter current password" />
                    </div>
                    
                    <div className={classes.setting_row}>
                      <div className={classes.setting_item}>
                        <label>New Password</label>
                        <input type="password" placeholder="Enter new password" />
                      </div>
                      <div className={classes.setting_item}>
                        <label>Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" />
                      </div>
                    </div>
                    
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="twoFactorAuth"
                          checked={formData.twoFactorAuth}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                    
                    <button className={classes.secondary_button}>Change Password</button>
                  </div>
                </div>

                {/* Appearance Settings */}
                <div className={classes.settings_card}>
                  <div className={classes.settings_header}>
                    <h3>Appearance Settings</h3>
                    <p>Customize the look and feel</p>
                  </div>
                  <div className={classes.settings_body}>
                    <div className={classes.setting_item}>
                      <label>Theme Color</label>
                      <div className={classes.color_picker}>
                        {['#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3', '#A8E6CF'].map(color => (
                          <div 
                            key={color}
                            className={classes.color_option} 
                            style={{ background: color }}
                          >
                            <input 
                              type="radio" 
                              name="themeColor" 
                              value={color}
                              checked={formData.themeColor === color}
                              onChange={handleInputChange}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={classes.setting_item}>
                      <label>Language</label>
                      <select 
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                      >
                        <option value="en">English</option>
                        <option value="am">አማርኛ (Amharic)</option>
                        <option value="om">Afaan Oromoo (Oromo)</option>
                        <option value="ti">ትግርኛ (Tigrinya)</option>
                      </select>
                    </div>
                    
                    <div className={classes.toggle_item}>
                      <div className={classes.toggle_info}>
                        <h4>Dark Mode</h4>
                        <p>Switch to dark theme</p>
                      </div>
                      <label className={classes.toggle_switch}>
                        <input 
                          type="checkbox" 
                          name="darkMode"
                          checked={formData.darkMode}
                          onChange={handleInputChange}
                        />
                        <span className={classes.toggle_slider}></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={classes.settings_actions}>
                  <button className={classes.save_button} onClick={handleSaveSettings}>
                    Save All Changes
                  </button>
                  <button className={classes.cancel_button} onClick={handleCancelSettings}>
                    Cancel
                  </button>
                  <button className={classes.reset_button} onClick={handleResetSettings}>
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className={classes.modal_overlay} onClick={() => setShowViewModal(false)}>
          <div className={classes.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modal_header}>
              <h2>View Details</h2>
              <button className={classes.modal_close} onClick={() => setShowViewModal(false)}>×</button>
            </div>
            <div className={classes.modal_body}>
              {selectedItem.title ? (
                // Product view
                <>
                  <img src={selectedItem.image} alt={selectedItem.title} className={classes.modal_image} />
                  <h3>{selectedItem.title}</h3>
                  <p className={classes.modal_category}>{selectedItem.category}</p>
                  <p className={classes.modal_description}>{selectedItem.description}</p>
                  <div className={classes.modal_info}>
                    <span className={classes.modal_price}>${selectedItem.price}</span>
                    <span className={classes.modal_rating}>⭐ {selectedItem.rating.rate} ({selectedItem.rating.count} reviews)</span>
                  </div>
                </>
              ) : (
                // User view
                <>
                  <h3>{selectedItem.name.firstname} {selectedItem.name.lastname}</h3>
                  <div className={classes.user_details}>
                    <p><strong>Username:</strong> {selectedItem.username}</p>
                    <p><strong>Email:</strong> {selectedItem.email}</p>
                    <p><strong>Phone:</strong> {selectedItem.phone}</p>
                    <p><strong>Address:</strong> {selectedItem.address.street}, {selectedItem.address.city}, {selectedItem.address.zipcode}</p>
                    <p><strong>Geolocation:</strong> Lat: {selectedItem.address.geolocation.lat}, Long: {selectedItem.address.geolocation.long}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className={classes.modal_overlay} onClick={() => setShowEditModal(false)}>
          <div className={classes.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modal_header}>
              <h2>Edit Product</h2>
              <button className={classes.modal_close} onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className={classes.modal_body}>
              <div className={classes.form_grid}>
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

                <div className={classes.form_group_full}>
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    placeholder="Enter product description"
                    rows="4"
                  ></textarea>
                </div>

                <div className={classes.form_group}>
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={productForm.rating.rate}
                    onChange={(e) => setProductForm(prev => ({
                      ...prev,
                      rating: { ...prev.rating, rate: e.target.value }
                    }))}
                    placeholder="0.0"
                    step="0.1"
                    min="0"
                    max="5"
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Review Count</label>
                  <input
                    type="number"
                    name="count"
                    value={productForm.rating.count}
                    onChange={(e) => setProductForm(prev => ({
                      ...prev,
                      rating: { ...prev.rating, count: e.target.value }
                    }))}
                    placeholder="0"
                  />
                </div>
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className={classes.modal_overlay} onClick={() => setShowAddModal(false)}>
          <div className={classes.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modal_header}>
              <h2>Add New Product</h2>
              <button className={classes.modal_close} onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className={classes.modal_body}>
              <div className={classes.form_grid}>
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

                <div className={classes.form_group_full}>
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleProductFormChange}
                    placeholder="Enter product description"
                    rows="4"
                  ></textarea>
                </div>

                <div className={classes.form_group}>
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    name="rating"
                    value={productForm.rating.rate}
                    onChange={(e) => setProductForm(prev => ({
                      ...prev,
                      rating: { ...prev.rating, rate: e.target.value }
                    }))}
                    placeholder="0.0"
                    step="0.1"
                    min="0"
                    max="5"
                  />
                </div>

                <div className={classes.form_group}>
                  <label>Review Count</label>
                  <input
                    type="number"
                    name="count"
                    value={productForm.rating.count}
                    onChange={(e) => setProductForm(prev => ({
                      ...prev,
                      rating: { ...prev.rating, count: e.target.value }
                    }))}
                    placeholder="0"
                  />
                </div>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedItem && (
        <div className={classes.modal_overlay} onClick={() => setShowDeleteModal(false)}>
          <div className={classes.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modal_header}>
              <h2>Confirm Delete</h2>
              <button className={classes.modal_close} onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className={classes.modal_body}>
              <p className={classes.modal_message}>
                Are you sure you want to delete {selectedItem.title ? `"${selectedItem.title.substring(0, 50)}..."` : `user "${selectedItem.username}"`}?
              </p>
              <p className={classes.modal_warning}>This action cannot be undone.</p>
              <div className={classes.modal_actions}>
                <button 
                  className={classes.modal_button_danger} 
                  onClick={selectedItem.title ? confirmDelete : confirmDeleteUser}
                >
                  Delete
                </button>
                <button className={classes.modal_button} onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayOut>
  );
};

export default Admin;
