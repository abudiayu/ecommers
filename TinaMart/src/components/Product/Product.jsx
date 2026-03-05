import React from 'react';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from "../Loader/Loding";
import { useProducts } from '../../Utility/ProductContext';

function Product() {
    const { products, loading } = useProducts();
    
  return (
    <>
    {
        loading ? (<Loader/>) : (<section className={classes.products_container}>
            {
                products.map((singleProduct)=>{
                    return <ProductCard renderAdd={true} key={singleProduct.id} product={singleProduct}/>
                })
            }
    
        </section>)
    }
    
    </>
    
  )
}

export default Product;
