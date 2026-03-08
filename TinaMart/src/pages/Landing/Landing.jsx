import React from 'react';
import LayOut from '../../components/LayOut/LayOut';
import CarouselEffect from '../../components/Carousel/CarouselEffect';
import Category from '../../components/Category/Category';
import Partner from '../../components/Partner/Partner';
import ShopSection from '../../components/ShopSection/ShopSection';
import Product from '../../components/Product/Product';
import Footer from '../../components/footer/Footer';

function Landing() {
  return (
    <LayOut>
      <CarouselEffect/>
      <Category/>
      <Partner/>
      <ShopSection/>
      <Product/> 
      <Footer/>       
    </LayOut>
  )
}

export default Landing;
