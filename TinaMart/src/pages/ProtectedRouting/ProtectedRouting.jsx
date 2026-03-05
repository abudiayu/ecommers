import React,{ useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../components/DataProvider/DataProvider';

const ProtectedRouting = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user,navigate,msg,redirect]);
  return children;
};

export default ProtectedRouting;
