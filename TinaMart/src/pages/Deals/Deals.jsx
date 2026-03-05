import React from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './deals.module.css';
import Product from '../../components/Product/Product';

function Deals() {
  return (
    <LayOut>
      <div className={classes.deals_container}>
        <div className={classes.deals_header}>
          <h1>Today's Deals</h1>
          <p>Save big on top products with limited-time offers</p>
        </div>
        
        <div className={classes.deals_banner}>
          <h2>🔥 Hot Deals of the Day</h2>
          <p>Up to 70% off on selected items</p>
        </div>

        <Product />
      </div>
    </LayOut>
  );
}

export default Deals;
