import React from 'react';
import LayOut from '../../components/LayOut/LayOut';
import classes from './registry.module.css';
import { FaGift, FaHeart, FaBaby, FaGraduationCap } from 'react-icons/fa';

function Registry() {
  return (
    <LayOut>
      <div className={classes.registry_container}>
        <div className={classes.registry_header}>
          <h1>Gift Registry</h1>
          <p>Create and manage your special occasion wishlists</p>
        </div>

        <div className={classes.registry_types}>
          <div className={classes.registry_card}>
            <FaHeart className={classes.icon} />
            <h3>Wedding Registry</h3>
            <p>Build your perfect wedding wishlist</p>
            <button>Create Registry</button>
          </div>

          <div className={classes.registry_card}>
            <FaBaby className={classes.icon} />
            <h3>Baby Registry</h3>
            <p>Prepare for your new arrival</p>
            <button>Create Registry</button>
          </div>

          <div className={classes.registry_card}>
            <FaGift className={classes.icon} />
            <h3>Birthday Registry</h3>
            <p>Make your birthday special</p>
            <button>Create Registry</button>
          </div>

          <div className={classes.registry_card}>
            <FaGraduationCap className={classes.icon} />
            <h3>Graduation Registry</h3>
            <p>Celebrate your achievement</p>
            <button>Create Registry</button>
          </div>
        </div>

        <div className={classes.find_registry}>
          <h2>Find a Registry</h2>
          <div className={classes.search_form}>
            <input type="text" placeholder="Enter registrant's name" />
            <button>Search</button>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Registry;
