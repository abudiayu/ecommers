import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../components/DataProvider/DataProvider';

function ShopperProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);
  const [isShopperValid, setIsShopperValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Not logged in - redirect to auth
      navigate('/auth', { state: { msg, redirect } });
      setLoading(false);
    } else {
      // Check if user is a registered shopper
      const shoppers = JSON.parse(localStorage.getItem('tinamartShoppers') || '[]');
      const shopper = shoppers.find(s => s.email === user.email);
      
      if (shopper && shopper.status === 'active') {
        setIsShopperValid(true);
      } else if (shopper && shopper.status !== 'active') {
        alert('Your shopper account is not active. Please contact the admin.');
        navigate('/');
      } else {
        alert('You are not registered as a shopper. Please contact the admin to register.');
        navigate('/');
      }
      setLoading(false);
    }
  }, [user, navigate, msg, redirect]);

  if (loading) {
    return null;
  }

  // Only render children if user is logged in AND is a valid active shopper
  return isShopperValid ? children : null;
}

export default ShopperProtectedRoute;
