import React, { useState, useEffect } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import classes from "./shopSection.module.css";
import { useProducts } from '../../Utility/ProductContext';
import { useSettings } from '../../Utility/SettingsContext';
import { useTranslation } from '../../Utility/translations';
import ProductCard from '../Product/ProductCard';
import Loader from '../Loader/Loding';

function ShopSection() {
  const { products, loading } = useProducts();
  const { settings } = useSettings();
  const t = useTranslation(settings.language);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
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
    <section id="shop-section" className={classes.shop_section}>
      {/* Collapsed Header */}
      {!isExpanded ? (
        <div 
          className={classes.collapsed_header}
          onClick={() => setIsExpanded(true)}
        >
          <h2>Shops</h2>
          <span className={classes.expand_icon}>›</span>
        </div>
      ) : (
        <>
          {/* Expanded Header */}
          <div className={classes.section_header}>
            <div className={classes.header_top}>
              <h2>Shop All Products</h2>
              <button 
                className={classes.collapse_btn}
                onClick={() => setIsExpanded(false)}
              >
                ✕
              </button>
            </div>
            <p>Discover amazing deals on quality products</p>
          </div>

          <div className={classes.shop_wrapper}>
        
        {/* Sidebar Filters */}
        <aside className={classes.sidebar}>
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
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={classes.products_grid}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
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
      </>
      )}
    </section>
  );
}

export default ShopSection;
