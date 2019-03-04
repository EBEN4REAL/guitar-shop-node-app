
import React from 'react';
import Slider from 'react-slick';
import Button from '../utils/Button';

const HomeSlider = (props) => {
    const slides = [
        {
            img:'/images/featured/featured_home_2.jpg',
            lineOne:'Fender',
            lineTwo:'Custom shop',
            linkTitle:'Shop now',
            linkTo:'/shop'
        },
    ]

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        // slideToShow: 1,
        slideToScroll: 1,
        arrows: true
    }
    const generateSlides = () => {
        return (
            slides.map((item , i) => (
                <div key={i}>
                    <div className="featured_image"
                        style={{ 
                            background: `url(${item.img})`,
                            height: `${window.innerHeight}px`
                         }}
                    >
                        <div className="featured_action">
                            <div className="tag title">
                                {item.lineOne}
                            </div>
                            <div className="tag title">
                                {item.lineTwo}
                            </div>
                            <div>
                                <Button 
                                type="default"
                                title={item.linkTitle}
                                linkTo={item.linkTo}
                                addStyles={{ 
                                    margin: '10px 0 0 0'
                                 }}>

                                </Button>
                            </div>
                        </div>

                    </div>

                </div>
            ))
        )
    }
    return (
        <div className="featured_container">
            <Slider {...settings}>
                
                {generateSlides()}
            </Slider>
        </div>
    );
}

export default HomeSlider;