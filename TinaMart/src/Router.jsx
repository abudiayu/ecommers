
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth/Auth';
import Payment from './pages/payment/Payment';
import Order from './pages/Order/Order';
import Cart from './pages/Cart/Cart';
import Results from "./pages/Results/Result";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import ProtectedRouting from './pages/ProtectedRouting/ProtectedRouting';
import Deals from './pages/Deals/Deals';
import CustomerService from './pages/CustomerService/CustomerService';
import Registry from './pages/Registry/Registry';
import GiftCards from './pages/GiftCards/GiftCards';
import Sell from './pages/Sell/Sell';
import Admin from './pages/Admin/Admin';

const stripePromise = loadStripe(
  'pk_test_51T7Not3G4ccsiEZgtq7EmHLugvczt9LSjpJGZPZfjkuTP1XrMBBe7H6OIH7Z8Q0386ikk1EpvN8SeAfNxClmXCQj008IpS4Hco');

function Routing() {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/deals' element={<Deals/>}/>
            <Route path='/customer-service' element={<CustomerService/>}/>
            <Route path='/registry' element={<Registry/>}/>
            <Route path='/gift-cards' element={<GiftCards/>}/>
            <Route path='/sell' element={<Sell/>}/>
            <Route path='/admin' element={
             
                <Admin/>

              }/>
            <Route path='/payment' element={
              <ProtectedRouting msg={"You must log in to pay !"} redirect={"/payment"}>

                <Elements stripe={stripePromise}>
                  <Payment/>
                </Elements>
              </ProtectedRouting>
              }/>
            <Route path='/order' element={
              <ProtectedRouting msg={"You must log in to access your orders!"} redirect={"/order"}>
                <Order/>
              </ProtectedRouting>
              }/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/category/:categoryName' element={<Results/>}/>
            <Route path='/products/:productId' element={<ProductDetail/>}/>

        </Routes> 
    </Router>
  )
}

export default Routing;
