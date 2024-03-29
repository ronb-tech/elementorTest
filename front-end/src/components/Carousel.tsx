import React, { useState, useEffect, CSSProperties } from "react";
import { onImgError } from "../utils/helper";
import Slider from "react-slick";
import { Photo } from "../utils/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface CarouselProps {
  photos: Photo[];
  currentImageIndex: number;
}

const Carousel: React.FC<CarouselProps> = ({ photos, currentImageIndex }) => {
  const [sliderKey, setSliderKey] = useState<number>(currentImageIndex || 0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const styleModal: CSSProperties = {
    position: "absolute",
    width: "500px",
    height: "500px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1999",
  };

  const styleCarousel: CSSProperties = {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    objectFit: "contain",
  };

  useEffect(() => {
    console.log("img index", currentImageIndex);
    setSliderKey(currentImageIndex);
  }, [currentImageIndex]);

  return (
    <div className="silder slider-container " style={styleModal}>
      <Slider {...settings} initialSlide={sliderKey} key={photos.length}>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              style={styleCarousel}
              src={photo.url}
              alt={photo.title}
              onError={onImgError}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
