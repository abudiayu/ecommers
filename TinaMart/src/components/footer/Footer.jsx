import React from "react";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { MdEmail } from "react-icons/md";
import { FaPhone, FaTelegram, FaLinkedin } from "react-icons/fa";
import { useSettings } from "../../Utility/SettingsContext";
import { useTranslation } from "../../Utility/translations";
import Logo3 from "../../assets/ttina.png"

export default function Footer() {
  const { settings } = useSettings();
  const t = useTranslation(settings.language);
  return (
    <footer className={classes.footer} id="top">

      {/* Top links */}
      <div className={classes.footerLinks}>
        <div>
          <h4>{t('getToKnowUs')}</h4>
          <Link to="/">{t('careers')}</Link>
          <Link to="/">{t('blog')}</Link>
          <Link to="/">{t('aboutUs')}</Link>
          <Link to="/">{t('investorRelations')}</Link>
        </div>

        <div>
          <h4>{t('makeMoneyWithUs')}</h4>
          <Link to="/sell">{t('sellProducts')}</Link>
          <Link to="/">{t('sellOnBusiness')}</Link>
          <Link to="/">{t('becomeAffiliate')}</Link>
          <Link to="/">{t('advertiseProducts')}</Link>
        </div>

        <div>
          <h4>{t('paymentProducts')}</h4>
          <Link to="/">{t('businessCard')}</Link>
          <Link to="/">{t('shopWithPoints')}</Link>
          <Link to="/">{t('reloadBalance')}</Link>
        </div>

        <div>
          <h4>{t('letUsHelp')}</h4>
          <Link to="/">{t('yourAccount')}</Link>
          <Link to="/">{t('yourOrders')}</Link>
          <Link to="/">{t('shippingPolicies')}</Link>
          <Link to="/">{t('help')}</Link>
        </div>
      </div>

      {/* Divider */}
      <div className={classes.divider}></div>

      {/* Logo + locale buttons */}
      <div className={classes.localeBar}>
        <img
            src={Logo3}
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
          ["tinaMartMusic", "tinaMartMusicDesc"],
          ["tinaMartAds", "tinaMartAdsDesc"],
          ["tinaBayFashion", "tinaBayFashionDesc"],
          ["tinaBayBooks", "tinaBayBooksDesc"],
          ["tinaMartAudio", "tinaMartAudioDesc"],
          ["sellOnTinaMart", "sellOnTinaMartDesc"],
          ["tinaMartLogistics", "tinaMartLogisticsDesc"],
          ["tinaMartBusiness", "tinaMartBusinessDesc"],
          ["tinaMartGlobal", "tinaMartGlobalDesc"],
          ["tinaMartCloud", "tinaMartCloudDesc"],
          ["tinaMartAudible", "tinaMartAudibleDesc"],
          ["tinaMartMedia", "tinaMartMediaDesc"],
          ["tinaMartPublishing", "tinaMartPublishingDesc"],
          ["tinaMartVideo", "tinaMartVideoDesc"],
          ["tinaBayDesigner", "tinaBayDesignerDesc"],
          ["tinaMartDeals", "tinaMartDealsDesc"],
          ["tinaBayShoes", "tinabayShoesDesc"],
          ["tinaMartSmartHome", "tinaMartSmartHomeDesc"],
          ["tinaMartSecurity", "tinaMartSecurityDesc"],
          ["tinaMartPharmacy", "tinaMartPharmacyDesc"],
        ].map(([titleKey, descKey]) => (
          <Link to="/" key={titleKey} className={classes.serviceItem}>
            <span className={classes.serviceTitle}>{t(titleKey)}</span>
            <span className={classes.serviceDesc}>{t(descKey)}</span>
          </Link>
        ))}
      </div>

      {/* Legal */}
      <div className={classes.legal}>
        <div className={classes.legalLinks}>
          <Link to="/">{t('conditionsOfUse')}</Link>
          <Link to="/">{t('privacyNotice')}</Link>
          <Link to="/">Consumer Health Data Privacy Disclosure</Link>
          <Link to="/">Your Ads Privacy Choices</Link>
        </div>
        <p className={classes.copyright}>{t('copyright')}</p>
        
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
