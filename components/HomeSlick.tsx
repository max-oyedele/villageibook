import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { Box, Text } from "@chakra-ui/react";

const HomeSlick = (props) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: false,
    autoplay: false,
    autoplaySpeed: 8000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef<Slider>();

  useEffect(() => {
    sliderRef.current.slickGoTo(props.sliderIndex);
  }, [props.sliderIndex]);

  return (
    <Fragment>
      <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
        <CustomSlide index={0} styles={props.styles} />
        <CustomSlide index={1} styles={props.styles} />
        <CustomSlide index={2} styles={props.styles} />
      </Slider>
    </Fragment>
  );
};

const CustomSlide = ({ index, styles }) => {
  const data = [
    {
      title: "Lorem Ipsum Dolor 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
    },
    {
      title: "Lorem Ipsum Dolor 2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
    },
    {
      title: "Lorem Ipsum Dolor 3",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam auctor euismod lobortis. Mauris ornare ante non justo mattis, vitae fermentum ligula consequat. Donec ac quam sit amet libero. Sed ullamcorper dui ac laoreet auctor. Mauris malesuada ante mauris, non elementum purus luctus sit amet. Nullam sed elit lectus.",
    },
  ];

  return (
    <Fragment>
      <Text fontSize="25px" color={styles.titleColor}>
        {data[index].title}
      </Text>
      <Text
        fontSize="13px"
        color={styles.descColor}
        w={{ base: "100%", md: "80%" }}
        mt={{ base: 4, md: 8 }}
      >
        {data[index].desc}
      </Text>
    </Fragment>
  );
};

export default HomeSlick;
