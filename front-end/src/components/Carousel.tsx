import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Photo } from "../utils/types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
    nextArrow: <ArrowForwardIosIcon />,
    prevArrow: <ArrowBackIosNewIcon />,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings}>
        {photos.map((photo) => (
          <div key={photo.id}>
            <Card>
              <CardMedia component="img" image={photo.url} alt={photo.title} />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
