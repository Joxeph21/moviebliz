import Slider from "react-slick";
import Loader from "./Loader";

function Responsive({ array, render, type }) {
  if (array === "undefined" || !array) return <Loader />;

  const videoCard = type === "videocard" ? true : false;

  const arrayLength = array?.length < 6;

  var settings = {
    dots: false,
    arrows: videoCard ? false : !arrayLength,
    infinite: false,
    speed: 500,
    slidesToShow: videoCard ? 3 : arrayLength ? array.length : 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: videoCard ? 3 : 4,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: videoCard ? 2 : 4,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: videoCard ? 1 : 3,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: videoCard ? 1 : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320,
        settings: {
          dots: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (array.length === 0) return <Loader />;
  return (
    <div
      className={`slider-container  ${!videoCard ? (array.length === 1 ? "lg:w-[13em]" : array.length === 2 ? "lg:w-[30em]" : array.length === 3 ? "lg:w-[42em]" : array.length === 4 ? "lg:w-[60em]" : array.length === 5 ? "" : "") : ""} `}
    >
      <Slider {...settings}>{array.map(render)}</Slider>
    </div>
  );
}

function CenterMode({ array, render }) {
  if (!array) return <Loader />;

  const arrayLength = array.length < 3;

  const settings = {
    className: "center",
    centerMode: false,
    arrows: false,
    infinite: false,
    centerPadding: "60px",
    slidesToShow: arrayLength ? 2 : 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="slider-container ">
      <Slider {...settings}>{array.map(render)}</Slider>
    </div>
  );
}

export { Responsive, CenterMode };
