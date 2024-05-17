import React from 'react'
import Header from '../Header/Header'
import './Gallery.css'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SimpleImageSlider from "react-simple-image-slider";

function Gallery() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    const images = [
        "https://wowslider.com/sliders/demo-18/data1/images/shanghai.jpg",
        "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
        "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg"
    ];

    const images1 = [
        {
            img: "https://wowslider.com/sliders/demo-18/data1/images/shanghai.jpg",
            text: "This is the first slide"
        },
        {
            img: "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
            text: "This is the second slide"
        },
        {
            img: "https://wowslider.com/sliders/demo-18/data1/images/new_york.jpg",
            text: "This is the third slide"
        }
    ]

    return (
        <div>
            <Header></Header>
            <div className='gallery_container'>
                <div className='slider_image'>
                    <Slider {...settings}>
                        {images1.map((img, index) => (
                            <div key={index} className='slider'>
                                <img src={img.img} alt='' />
                                <div className='slider_text'>{img.text}</div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className='slider_image2'>
                    <SimpleImageSlider
                        width={'98%'}
                        height={504}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                        autoPlay={true}
                        autoPlayDelay={2}
                    />
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SimpleImageSlider
                            width={'50%'}
                            height={280}
                            images={images}
                            showBullets={true}
                            showNavs={true}
                            autoPlay={true}
                            autoPlayDelay={2}
                        />
                    </div>
                    <div className='col-sm-6 slider_content'>
                        <p>
                            Hey [Name], get 20% off on all orders over $50 this weekend only! Use code SAVE20 at checkout. Shop now: [Link]
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6 slider_content'>
                        <p>
                            Hey [Name], get 20% off on all orders over $50 this weekend only! Use code SAVE20 at checkout. Shop now: [Link]
                        </p>
                    </div>
                    <div className='col-sm-6'>
                        <Slider {...settings}>
                            {images.map((img, index) => (
                                <div key={index}>
                                    <img src={img} alt='' style={{ width: '100%', height: 'auto' }} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery
