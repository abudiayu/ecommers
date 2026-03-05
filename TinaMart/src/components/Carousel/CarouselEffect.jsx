import React from 'react';
import {Carousel} from "react-responsive-carousel";
import {img} from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./carsousel.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CarouselEffect() {
  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 20px)',
    width: 40,
    height: 40,
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  };

  const customArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        style={{ ...arrowStyles, left: 15 }}
        className={classes.carousel_arrow}
      >
        <IoIosArrowBack size={28} color="#1a1a1a" />
      </button>
    );

  const customArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        style={{ ...arrowStyles, right: 15 }}
        className={classes.carousel_arrow}
      >
        <IoIosArrowForward size={28} color="#1a1a1a" />
      </button>
    );

  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={600}
        renderArrowPrev={customArrowPrev}
        renderArrowNext={customArrowNext}
      >
        {img.map((imageItemLink, index) => {
          return <img key={index} src={imageItemLink} alt="Carousel images" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </>
  );
}

export default CarouselEffect;
