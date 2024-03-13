import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Photo } from "../utils/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
interface CarouselProps {
  photos: Photo[];
}

const Carousel: React.FC<CarouselProps> = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const fallbackImg = "https://picsum.photos/300/300";
    event.currentTarget.src = fallbackImg;
  };

  return (
    <div className="slider-container">
      <Slider {...settings} key={photos.length}>
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
