import React, { useEffect, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard';
import Loader from "../../components/Loader/Loding";
import { useProducts } from '../../Utility/ProductContext';

function ProductDetail() {
  const { productId } = useParams();
  const { getProductById, loading } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = getProductById(productId);
    setProduct(foundProduct);
  }, [productId, getProductById]);

  return (
    <LayOut>
      {loading || !product ? (<Loader/>) : (<ProductCard  
        product={product}
        flex={true}  
        renderDesc={true}   
        renderAdd={true}    
      />)}
    </LayOut>
  )
}

export default ProductDetail;
