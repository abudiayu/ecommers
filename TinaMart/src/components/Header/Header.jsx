import React, { useContext, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./header.module.css";
import { IoLanguage } from "react-icons/io5";
import LowerHeader from './LowerHeader';
import {Link} from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';
import { useSettings } from '../../Utility/SettingsContext';
import { useTranslation } from '../../Utility/translations';
import Logo from "../../assets/ttina.png"

const Header=()=> {

  const [{user, basket}, dispatch] = useContext(DataContext);
  const { settings, updateSettings } = useSettings();
  const t = useTranslation(settings.language);
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

            {/* Left side - Logo */}
            <div className={classes.logo_container} >
              <Link to="/">
                <img className={classes.logo_img}
                  src={Logo} 
                  alt="TinaMart logo" 
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className={classes.search}>
              <select>
                <option value="">All</option>
              </select>

              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
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
                <select 
                  value={settings.language} 
                  onChange={(e) => updateSettings({ language: e.target.value })}
                >
                  <option value="en">EN</option>
                  <option value="am">አማ</option>
                </select>
              </div>

              {/* Account */}
              <Link to={!user &&"/auth"}>
                <div>
                  {
                    user ? (
                      <>
                       <p>{t('hello')}, {user?.email?.split("@")[0]}</p>
                       <span onClick={()=> auth.signOut()}>{t('signOut')}</span>
                      </>
                    
                    ) :(
                      <>
                        <p>{t('hello')}, {t('signIn')}</p>
                        <span>{t('account')}</span>
                      </> 
                    )}
                </div>
              </Link>

              {/* Orders */}
              <Link to="/order">
                <div>
                  <p>{t('returns')}</p>
                  <span>{t('orders')}</span>
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
