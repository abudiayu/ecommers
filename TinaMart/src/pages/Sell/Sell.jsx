import React from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './sell.module.css';
import { FaStore, FaChartLine, FaShippingFast, FaDollarSign } from 'react-icons/fa';

function Sell() {
  return (
    <LayOut>
      <div className={classes.sell_container}>
        <div className={classes.sell_header}>
          <h1>Sell on TinaMart</h1>
          <p>Start your business journey with us today</p>
        </div>

        <div className={classes.benefits_grid}>
          <div className={classes.benefit_card}>
            <FaStore className={classes.icon} />
            <h3>Easy Setup</h3>
            <p>Create your seller account in minutes</p>
          </div>

          <div className={classes.benefit_card}>
            <FaChartLine className={classes.icon} />
            <h3>Grow Your Business</h3>
            <p>Reach millions of customers</p>
          </div>

          <div className={classes.benefit_card}>
            <FaShippingFast className={classes.icon} />
            <h3>Fast Shipping</h3>
            <p>We handle logistics for you</p>
          </div>

          <div className={classes.benefit_card}>
            <FaDollarSign className={classes.icon} />
            <h3>Competitive Fees</h3>
            <p>Low commission rates</p>
          </div>
        </div>

        <div className={classes.signup_section}>
          <h2>Start Selling Today</h2>
          <form className={classes.signup_form}>
            <input type="text" placeholder="Business Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" required />
            <select required>
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Kitchen</option>
              <option value="books">Books</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Tell us about your business" rows="4"></textarea>
            <button type="submit">Register as Seller</button>
          </form>
        </div>

        <div className={classes.info_section}>
          <h2>Why Sell on TinaMart?</h2>
          <ul>
            <li>Access to millions of active customers</li>
            <li>Secure payment processing</li>
            <li>Marketing and promotional tools</li>
            <li>24/7 seller support</li>
            <li>Analytics and reporting dashboard</li>
          </ul>
        </div>
      </div>
    </LayOut>
  );
}

export default Sell;
