import React, { useEffect, useState } from 'react'
import styles from './carousel.module.css';
import { slides } from "./carousel_data.json";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { HiOutlineArrowSmLeft } from "react-icons/hi";


function Carousel() {
  const [ Slide, setSlide ] = useState(1);
  const handlePrev = () => {
    setSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }
  const handleDotClick = (index) => {
    setSlide(index);
  };

  const handleKeyDown = (e) => {
    if(e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight"){
      handleNext();
    }
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      handleNext();
    }, 6000); // Change slide every 5 seconds

    return () => clearTimeout(interval);
  }
  , [Slide]);

  return (
    <>
        <div className={styles.carousel} onKeyDown={handleKeyDown}>
            <div className={styles.carouselContainer}>
                <HiOutlineArrowSmLeft className={styles.prevButton} onClick={handlePrev}  />
                
                {slides.map((slide, index) => (
                    <div key={index} className={(Slide === index) ? (styles.slide) : (styles.slideInactive)}>
                        <img src={slide.src} alt={slide.alt} className={styles.slideImage} />
                        {/* <div className={styles.slideContent}>
                            <h2 className={styles.slideTitle}>{slide.title}</h2>
                            <p className={styles.slideDescription}>{slide.description}</p>
                        </div> */}
                    </div>
        
                ))}
                
                <HiOutlineArrowSmRight className={styles.nextButton} onClick={handleNext} />
                <span className={styles.indicators}>
                  {slides.map((_, idx) => (
                    <button key={idx} onClick={() => handleDotClick(idx)} className={(Slide === idx ? (styles.indicator) : (styles.indicatorInactive))}></button>
                  ))}
                </span>
            </div>
        </div>
    </>
  )
}

export default Carousel