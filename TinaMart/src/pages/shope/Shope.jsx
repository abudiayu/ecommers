import React, { useState, useEffect } from 'react';
import { FaFilter, FaThLarge, FaList, FaStar } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import classes from "./Shope.module.css";
import LayOut from '../../components/LayOut/LayOut';
import { useProducts } from '../../Utility/ProductContext';
import { useSettings } from '../../Utility/SettingsContext';
import { useTranslation } from '../../Utility/translations';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loding';

function Shope() {
  const { products, loading } = useProducts();
  const { settings } = useSettings();
  const t = useTranslation(settings.language);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(true);
  const [minRating, setMinRating] = useState(0);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Get price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      const maxPrice = Math.max(...prices);
      setPriceRange([0, maxPrice]);
    }
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating.rate >= minRating);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy, minRating]);

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LayOut>
      <section className={classes.shope_container}>
        
        {/* Hero Banner */}
        <div className={classes.hero_banner}>
          <div className={classes.hero_content}>
            <h1>Shop All Products</h1>
            <p>Discover amazing deals on quality products</p>
          </div>
        </div>

        <div className={classes.shope_wrapper}>
          
          {/* Sidebar Filters */}
          <aside className={`${classes.sidebar} ${showFilters ? classes.show : classes.hide}`}>
            <div className={classes.filter_header}>
              <h3><FaFilter /> Filters</h3>
              <button 
                className={classes.clear_btn}
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, Math.max(...products.map(p => p.price))]);
                  setMinRating(0);
                }}
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            <div className={classes.filter_section}>
              <h4>Categories</h4>
              <div className={classes.category_list}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`${classes.category_btn} ${selectedCategory === cat ? classes.active : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'all' ? 'All Products' : cat}
                    <span className={classes.count}>
                      ({cat === 'all' ? products.length : products.filter(p => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className={classes.filter_section}>
              <h4>Price Range</h4>
              <div className={classes.price_inputs}>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  placeholder="Max"
                />
              </div>
              <div className={classes.price_slider}>
                <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map(p => p.price))}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className={classes.slider}
                />
              </div>
              <div className={classes.price_labels}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className={classes.filter_section}>
              <h4>Minimum Rating</h4>
              <div className={classes.rating_filter}>
                {[4, 3, 2, 1, 0].map(rating => (
                  <button
                    key={rating}
                    className={`${classes.rating_btn} ${minRating === rating ? classes.active : ''}`}
                    onClick={() => setMinRating(rating)}
                  >
                    {rating > 0 ? (
                      <>
                        {[...Array(rating)].map((_, i) => (
                          <FaStar key={i} className={classes.star} />
                        ))}
                        <span>& Up</span>
                      </>
                    ) : (
                      <span>All Ratings</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className={classes.main_content}>
            
            {/* Toolbar */}
            <div className={classes.toolbar}>
              <div className={classes.toolbar_left}>
                <button 
                  className={classes.filter_toggle}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter /> {showFilters ? 'Hide' : 'Show'} Filters
                </button>
                <p className={classes.results_count}>
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              <div className={classes.toolbar_right}>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className={classes.sort_select}
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className={classes.view_toggle}>
                  <button
                    className={viewMode === 'grid' ? classes.active : ''}
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <MdGridView />
                  </button>
                  <button
                    className={viewMode === 'list' ? classes.active : ''}
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div className={`${classes.products_container} ${viewMode === 'list' ? classes.list_view : classes.grid_view}`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    renderDesc={viewMode === 'list'}
                    renderAdd={true}
                  />
                ))}
              </div>
            ) : (
              <div className={classes.no_results}>
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more results</p>
              </div>
            )}
          </main>
        </div>
      </section>
    </LayOut>
  );
}

export default Shope;