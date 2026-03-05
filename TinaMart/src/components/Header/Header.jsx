import React, { useContext, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { IoLanguage } from "react-icons/io5";
import LowerHeader from './LowerHeader';
import {Link} from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';
import { useSettings } from '../../Utility/SettingsContext';

const Header=()=> {

  const [{user, basket}, dispatch] = useContext(DataContext);
  const { settings } = useSettings();
  const totalItem = basket?.reduce((amount,item)=>{
  return item.amount + amount
  },0)

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    document.body.classList.add('search-active');
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    document.body.classList.remove('search-active');
  };

  return (
    <>
      {isSearchFocused && <div className={classes.blur_overlay} onClick={handleSearchBlur}></div>}
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container} >

            {/* Left side - Logo & Delivery */}
            <div className={classes.logo_container} >
              <Link to="/">
                <img className={classes.logo_img}
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                  alt="TinaMart logo" 
                />
              </Link>

              {/* Delivery */}
              <div className={classes.delivery}>
                <span >
              <SlLocationPin style={{ paddingLeft: "18px" }} size={20} />
                </span>
                <div style={{ paddingRight: "10px" }} className={classes.delivery_eth}>
                  <p>Deliver to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className={classes.search}>
              <select>
                <option value="">All</option>
              </select>

              <input 
                type="text" 
                placeholder="Search products..." 
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <button className={classes.search_button}>
                <BsSearch size={22}  />
              </button>
            </div>

            {/* Right side links */}
            <div className={classes.order_container}>
              <div className={classes.language}>
                <IoLanguage size={24} />
                <select value={settings.language} disabled>
                  <option value="en">EN</option>
                  <option value="am">አማ</option>
                  <option value="om">OM</option>
                  <option value="ti">ትግ</option>
                </select>
              </div>

              {/* Account */}
              <Link to={!user &&"/auth"}>
                <div>
                  {
                    user ? (
                      <>
                       <p>Hello, {user?.email?.split("@")[0]}</p>
                       <span onClick={()=> auth.signOut()}>Sign Out</span>
                      </>
                    
                    ) :(
                      <>
                        <p>Hello, Sign In</p>
                        <span>Account & Lists</span>
                      </> 
                    )}
                </div>
              </Link>

              {/* Orders */}
              <Link to="/order">
                <div>
                  <p>Returns</p>
                  <span>& Orders</span>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className={classes.cart}>
                <BiCart size={45}/>
                <span>{totalItem}</span>
              </Link>

            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  )
}


export default Header;
