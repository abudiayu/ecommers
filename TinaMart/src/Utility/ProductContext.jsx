import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [canUndo, setCanUndo] = useState(false);

  // Load products from localStorage or API
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Check if we have custom products in localStorage
        const savedProducts = localStorage.getItem('tinamartProducts');
        
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          // Load from API if no saved products
          const response = await axios.get('https://fakestoreapi.com/products');
          setProducts(response.data);
          localStorage.setItem('tinamartProducts', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('tinamartProducts', JSON.stringify(products));
    }
  }, [products]);

  // Update canUndo state
  useEffect(() => {
    setCanUndo(history.length > 0);
  }, [history]);

  const saveToHistory = (action, data) => {
    setHistory(prev => [...prev, { action, data, timestamp: Date.now() }]);
    // Keep only last 10 actions
    if (history.length > 10) {
      setHistory(prev => prev.slice(-10));
    }
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    
    saveToHistory('add', { product: newProduct });
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    const oldProduct = products.find(p => p.id === id);
    
    saveToHistory('update', { id, oldProduct, newProduct: updatedProduct });
    setProducts(prev => 
      prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
    );
  };

  const deleteProduct = (id) => {
    const deletedProduct = products.find(p => p.id === id);
    
    saveToHistory('delete', { product: deletedProduct });
    setProducts(prev => prev.filter(p => p.id !== id));
    return deletedProduct;
  };

  const undo = () => {
    if (history.length === 0) return null;

    const lastAction = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    switch (lastAction.action) {
      case 'add':
        // Undo add: remove the product
        setProducts(prev => prev.filter(p => p.id !== lastAction.data.product.id));
        return { action: 'add', product: lastAction.data.product };

      case 'delete':
        // Undo delete: restore the product
        setProducts(prev => [...prev, lastAction.data.product]);
        return { action: 'delete', product: lastAction.data.product };

      case 'update':
        // Undo update: restore old product
        setProducts(prev => 
          prev.map(p => p.id === lastAction.data.id ? lastAction.data.oldProduct : p)
        );
        return { action: 'update', product: lastAction.data.oldProduct };

      default:
        return null;
    }
  };

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  const resetProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setHistory([]);
      localStorage.setItem('tinamartProducts', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error resetting products:', error);
    }
  };

  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        loading, 
        addProduct, 
        updateProduct, 
        deleteProduct, 
        getProductById,
        getProductsByCategory,
        resetProducts,
        setProducts,
        undo,
        canUndo,
        historyLength: history.length
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
