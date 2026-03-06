import React, { useEffect, useState } from 'react';
import classes from "./result.module.css";
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard';
import Loader from "../../components/Loader/Loding";
import { useProducts } from '../../Utility/ProductContext';
import { useSettings } from '../../Utility/SettingsContext';
import { useTranslation } from '../../Utility/translations';

function Result() {
  const [results, setResults] = useState([]);
  const { products, loading } = useProducts();
  const { categoryName } = useParams();
  const { settings } = useSettings();
  const t = useTranslation(settings.language);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(p => p.category === categoryName);
      setResults(filtered);
    }
  }, [categoryName, products]); 

  return (
    <LayOut>
      {
        loading ? (<Loader/>) : (<section> 
            <h1 style={{padding:"30px"}}>{t('results')}</h1>
            <p style={{padding:"30px"}}>{t('category')} / {categoryName}</p>
            <hr />
            <div className={classes.products_cotainer}>
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              ))}
            </div>
      </section>)
      }
         
    </LayOut>
  );
}

export default Result;
