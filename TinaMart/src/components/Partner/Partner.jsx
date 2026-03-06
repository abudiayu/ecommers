import React from 'react';
import classes from './partner.module.css';
import { Link } from 'react-router-dom';

function Partner() {
  const partners = [
    {
      name: 'Ethio Telecom',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBugwvcZB0HjjL_8Yh3rDcY4QYrK5ccpQKSg&s',
      alt: 'Ethio Telecom Logo'
      
    },
    {
      name: 'CBE',
      logo: 'https://images.seeklogo.com/logo-png/54/2/commercial-bank-of-ethiopia-logo-png_seeklogo-547506.png',
      alt: 'Commercial Bank of Ethiopia Logo'
    },
    {
      name: 'Dashen Bank',
      logo: 'https://play-lh.googleusercontent.com/iqSg1Sbo332FCja9e99khtAOwyVWZhZp1IRvulU_U9ASnOnnnCxXCFocCEE6PhMVAUw',
      alt: 'Dashen Bank Logo'
    },
    {
      name: 'Awash Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Awash_Bank_Final_logo.jpg/960px-Awash_Bank_Final_logo.jpg',
      alt: 'Awash Bank Logo'
    },
    {
      name: 'Ethiopian Airlines',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTITOlayboDp1GMCFoGaE-HI-WCp4Gr_kuzgQ&s',
      alt: 'Ethiopian Airlines Logo'
    },
    {
      name: 'Bank of Abyssinia',
      logo: 'https://apollo.bankofabyssinia.com/wp-content/uploads/2022/11/Asset-1.png',
      alt: 'Bank of Abyssinia Logo'
    },
    {
      name: 'Wegagen Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Wogagen_Bank.png',
      alt: 'Wegagen Bank Logo'
    },
    {
      name: 'Nib Bank',
      logo: 'https://play-lh.googleusercontent.com/HR87m6M2_7ZmPGrSp_MSlmfG5uyx94iYthItSzrmWVgFWkJ3FPTOYCLPw0F_ul4mYg',
      alt: 'Nib International Bank Logo'
    },
    {
      name: 'Bunna Bank',
      logo: 'https://static.wixstatic.com/media/44a5be_3eefe15777d048c68ab5169310efc1a3~mv2.png/v1/fill/w_280,h_236,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png',
      alt: 'Bunna Bank Logo'
    },
    {
      name: 'Zemen Bank',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxvoobCA6q80OfeOGPGh3w5rJBUVYGlwZuw&s',
      alt: 'Zemen Bank Logo'
    }
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className={classes.partner_section}>
      <div className={classes.partner_container}>
        <div className={classes.section_header}>
          <h2>Our Partners</h2>
        </div>
        
        <div className={classes.marquee_wrapper}>
          <div className={classes.marquee_content}>
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={index} 
                className={classes.partner_item}
              >
                <div className={classes.logo_circle}>
                  <img 
                    src={partner.logo} 
                    alt={partner.alt}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.target.src = `https://via.placeholder.com/150/FFD700/1a1a1a?text=${partner.name.split(' ')[0]}`;
                    }}
                  />
                </div>
                <p className={classes.partner_name}>{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partner;
