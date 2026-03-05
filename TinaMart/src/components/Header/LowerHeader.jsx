import React, { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./header.module.css";
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";

function LowerHeader() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={classes.lower_container}>
      <ul className={toggle ? classes.show : classes.hide}>
        <li onClick={() => setToggle(!toggle)} className={classes.view}>
          <AiOutlineMenu />
          <p>ALL</p>
        </li>
        <li>
          <Link to="/deals">
            Today's Deals 
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/customer-service">
            Customer Service
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/registry">
            Registry
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/gift-cards">
            Gift Cards
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/sell">
            Sell
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default LowerHeader;
