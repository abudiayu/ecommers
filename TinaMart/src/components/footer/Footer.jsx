import React from "react";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { MdEmail } from "react-icons/md";
import { FaPhone, FaTelegram, FaLinkedin } from "react-icons/fa";
import { useSettings } from "../../Utility/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();
  return (
    <footer className={classes.footer} id="top">

      {/* Top links */}
      <div className={classes.footerLinks}>
        <div>
          <h4>Get to Know Us</h4>
          <Link to="/">Careers</Link>
          <Link to="/">Blog</Link>
          <Link to="/">About Amazon</Link>
          <Link to="/">Investor Relations</Link>
        </div>

        <div>
          <h4>Make Money with Us</h4>
          <Link to="/">Sell products</Link>
          <Link to="/">Sell on Amazon Business</Link>
          <Link to="/">Become an Affiliate</Link>
          <Link to="/">Advertise Your Products</Link>
        </div>

        <div>
          <h4>Amazon Payment Products</h4>
          <Link to="/">Amazon Business Card</Link>
          <Link to="/">Shop with Points</Link>
          <Link to="/">Reload Your Balance</Link>
        </div>

        <div>
          <h4>Let Us Help You</h4>
          <Link to="/">Your Account</Link>
          <Link to="/">Your Orders</Link>
          <Link to="/">Shipping Rates & Policies</Link>
          <Link to="/">Help</Link>
        </div>
      </div>

      {/* Divider */}
      <div className={classes.divider}></div>

      {/* Logo + locale buttons */}
      <div className={classes.localeBar}>
        <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="TinaMart"
            className={classes.logo}
        />

        <div className={classes.localeButtons}>
          <select className={classes.localeBtn}>
            <option value="en">🌐 English</option>
            <option value="am">🌐 አማርኛ (Amharic)</option>
            <option value="om">🌐 Afaan Oromoo (Oromo)</option>
            <option value="ti">🌐 ትግርኛ (Tigrinya)</option>
          </select>
          
          <select className={classes.localeBtn}>
            <option value="ETB">ETB - Ethiopian Birr</option>
            <option value="USD">$ USD - US Dollar</option>
            <option value="EUR">€ EUR - Euro</option>
          </select>
          
          <Link to="/" className={classes.localeBtn}>🇪🇹 ETHIOPIA</Link>
        </div>
      </div>

      {/* Services grid */}
      <div className={classes.servicesGrid}>
        {[
          ["Amazon Music", "Stream millions of songs"],
          ["Amazon Ads", "Reach customers everywhere"],
          ["6pm", "Deals on fashion brands"],
          ["AbeBooks", "Books, art & collectibles"],
          ["ACX", "Audiobook Publishing Made Easy"],
          ["Sell on Amazon", "Start a Selling Account"],
          ["Veeqo", "Shipping & Inventory Management"],
          ["Amazon Business", "Everything For Your Business"],
          ["AmazonGlobal", "Ship Orders Internationally"],
          ["AWS", "Scalable Cloud Computing"],
          ["Audible", "Books & Original Audio"],
          ["IMDb", "Movies, TV & Celebrities"],
          ["Kindle Direct Publishing", "Self-Publish Made Easy"],
          ["Prime Video Direct", "Video Distribution"],
          ["Shopbop", "Designer Fashion"],
          ["Woot!", "Deals & Shenanigans"],
          ["Zappos", "Shoes & Clothing"],
          ["Ring", "Smart Home Security"],
          ["Blink", "Smart Home Security"],
          ["PillPack", "Pharmacy Simplified"],
        ].map(([title, desc]) => (
          <Link to="/" key={title} className={classes.serviceItem}>
            <span className={classes.serviceTitle}>{title}</span>
            <span className={classes.serviceDesc}>{desc}</span>
          </Link>
        ))}
      </div>

      {/* Legal */}
      <div className={classes.legal}>
        <div className={classes.legalLinks}>
          <Link to="/">Conditions of Use</Link>
          <Link to="/">Privacy Notice</Link>
          <Link to="/">Consumer Health Data Privacy Disclosure</Link>
          <Link to="/">Your Ads Privacy Choices</Link>
        </div>
        <p className={classes.copyright}>© 1996–2025, {settings.storeName}.com, Inc. | Developed by ABDUL QADIR</p>
        
        <div className={classes.contactInfo}>
            <a href={`mailto:${settings.storeEmail}`} target="_blank" rel="noopener noreferrer">
              <MdEmail className={classes.contactIcon} /> {settings.storeEmail}
            </a>
            <a href={`tel:${settings.storePhone.replace(/\s/g, '')}`}>
              <FaPhone className={classes.contactIcon} /> {settings.storePhone}
            </a>
            <a href="https://t.me/AbudyTy" target="_blank" rel="noopener noreferrer">
              <FaTelegram className={classes.contactIcon} /> Telegram
            </a>
            <a href="https://www.linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className={classes.contactIcon} /> LinkedIn
            </a>
        </div>
      </div>

    </footer>
  );
}
