import React, { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./header.module.css";
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSettings } from '../../Utility/SettingsContext';
import { useTranslation } from '../../Utility/translations';

function LowerHeader() {
  const [toggle, setToggle] = useState(false);
  const { settings } = useSettings();
  const t = useTranslation(settings.language);

  return (
    <div className={classes.lower_container}>
      <ul className={toggle ? classes.show : classes.hide}>
        <li onClick={() => setToggle(!toggle)} className={classes.view}>
          <AiOutlineMenu />
          <p>{t('all')}</p>
        </li>
        <li>
          <Link to="/shop">
            {t('shop')}
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/deals">
            {t('todaysDeals')}
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/customer-service">
            {t('customerService')}
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/registry">
            {t('registry')}
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/gift-cards">
            {t('giftCards')}
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
        <li>
          <Link to="/sell">
            {t('sell')}
            <MdKeyboardArrowRight className={classes.hide_icon}/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default LowerHeader;
