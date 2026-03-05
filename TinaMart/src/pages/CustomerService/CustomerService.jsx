import React from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './customerService.module.css';
import { MdEmail, MdPhone, MdChat } from 'react-icons/md';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';

function CustomerService() {
  return (
    <LayOut>
      <div className={classes.service_container}>
        <div className={classes.service_header}>
          <h1>Customer Service</h1>
          <p>We're here to help you 24/7</p>
        </div>

        <div className={classes.contact_grid}>
          <div className={classes.contact_card}>
            <MdEmail className={classes.icon} />
            <h3>Email Support</h3>
            <p>abudiayuu@gmail.com</p>
            <a href="mailto:abudiayuu@gmail.com">Send Email</a>
          </div>

          <div className={classes.contact_card}>
            <MdPhone className={classes.icon} />
            <h3>Phone Support</h3>
            <p>+251 901 013 902</p>
            <a href="tel:+251901013902">Call Now</a>
          </div>

          <div className={classes.contact_card}>
            <FaTelegram className={classes.icon} />
            <h3>Telegram</h3>
            <p>Chat with us instantly</p>
            <a href="https://t.me/AbudyTy" target="_blank" rel="noopener noreferrer">Open Telegram</a>
          </div>

          <div className={classes.contact_card}>
            <MdChat className={classes.icon} />
            <h3>Live Chat</h3>
            <p>Get instant help</p>
            <button>Start Chat</button>
          </div>
        </div>

        <div className={classes.faq_section}>
          <h2>Frequently Asked Questions</h2>
          <div className={classes.faq_item}>
            <h3>How do I track my order?</h3>
            <p>Go to "Orders" section in your account to track your shipment in real-time.</p>
          </div>
          <div className={classes.faq_item}>
            <h3>What is your return policy?</h3>
            <p>We offer 30-day returns on most items. Contact us for assistance.</p>
          </div>
          <div className={classes.faq_item}>
            <h3>How long does shipping take?</h3>
            <p>Standard delivery takes 3-5 business days within Ethiopia.</p>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default CustomerService;
