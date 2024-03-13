import React, { useState, useEffect } from "react";
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    console.log("img index", currentImageIndex);
    setSliderKey(currentImageIndex);
  }, [currentImageIndex]);

  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const fallbackImg = "https://picsum.photos/300/300";
    event.currentTarget.src = fallbackImg;
  };

  return (
    <div className="slider-container">
      <Slider {...settings} initialSlide={sliderKey} key={photos.length}>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              className="img-slider"
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
