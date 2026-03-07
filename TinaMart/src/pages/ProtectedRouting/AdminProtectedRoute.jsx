import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../components/DataProvider/DataProvider';

const ADMIN_EMAIL = 'qadire@gmail.com';

function AdminProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      // Not logged in - redirect to auth
      navigate('/auth', { state: { msg, redirect } });
    } else if (user.email !== ADMIN_EMAIL) {
      // Logged in but not admin - redirect to home with error
      alert('Access Denied: You do not have permission to access the admin panel.');
      navigate('/');
    }
  }, [user, navigate, msg, redirect]);

  // Only render children if user is logged in AND is the admin
  return user && user.email === ADMIN_EMAIL ? children : null;
}

export default AdminProtectedRoute;
