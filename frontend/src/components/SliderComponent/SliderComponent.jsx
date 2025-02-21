import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardOpinionComponent from '../CardOpinionComponent/CardOpinionComponent';

function SliderComponent(props) {
    const sliderItems = Object.values(props);

    var settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
              }
            }
          ]
    };
    return (
        <Slider {...settings}>
            {
                sliderItems.map((item, index) => {
                    return(
                        <CardOpinionComponent {...item} key={index}/>
                    )
                })
            }
        </Slider>
    );
}

export default SliderComponent
