import React from 'react';
import classes from "./category.module.css";
import { Link } from 'react-router-dom';
import { useSettings } from '../../Utility/SettingsContext';
import { useTranslation } from '../../Utility/translations';

function CategoryCard({data}) {
  const { settings } = useSettings();
  const t = useTranslation(settings.language);
  
  // Map category names to translation keys
  const categoryKeyMap = {
    'electronics': 'electronics',
    'jewelery': 'jewelery',
    "women's clothing": 'womensClothing',
    "men's clothing": 'mensClothing'
  };
  
  const translatedTitle = t(categoryKeyMap[data.name]) || data.title;
  
  return (
    <div className={classes.category}>

      <Link to={`/category/${data.name}`}>
        <span>
            <h2>{translatedTitle}</h2>
        </span>
        <img src={data.imgLink} alt="/product" />
        <p>shope now {">"}</p>
      </Link>
    </div>
  )
}

export default CategoryCard;
