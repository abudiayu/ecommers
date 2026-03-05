import React from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './giftCards.module.css';
import { FaGift, FaCreditCard, FaMobileAlt } from 'react-icons/fa';

function GiftCards() {
  const cardAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <LayOut>
      <div className={classes.giftcard_container}>
        <div className={classes.giftcard_header}>
          <h1>Gift Cards</h1>
          <p>The perfect gift for any occasion</p>
        </div>

        <div className={classes.card_types}>
          <div className={classes.type_card}>
            <FaGift className={classes.icon} />
            <h3>Physical Gift Card</h3>
            <p>Delivered to your address</p>
          </div>

          <div className={classes.type_card}>
            <FaCreditCard className={classes.icon} />
            <h3>Digital Gift Card</h3>
            <p>Instant email delivery</p>
          </div>

          <div className={classes.type_card}>
            <FaMobileAlt className={classes.icon} />
            <h3>Mobile Gift Card</h3>
            <p>Send via SMS</p>
          </div>
        </div>

        <div className={classes.amount_section}>
          <h2>Select Amount (ETB)</h2>
          <div className={classes.amount_grid}>
            {cardAmounts.map((amount) => (
              <button key={amount} className={classes.amount_btn}>
                {amount} ETB
              </button>
            ))}
            <button className={classes.amount_btn}>Custom Amount</button>
          </div>
        </div>

        <div className={classes.purchase_section}>
          <h2>Purchase Gift Card</h2>
          <form className={classes.purchase_form}>
            <input type="text" placeholder="Recipient Name" />
            <input type="email" placeholder="Recipient Email" />
            <textarea placeholder="Personal Message (Optional)" rows="4"></textarea>
            <button type="submit">Buy Gift Card</button>
          </form>
        </div>
      </div>
    </LayOut>
  );
}

export default GiftCards;
