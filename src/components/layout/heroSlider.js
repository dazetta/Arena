import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import heroImage from '../../assets/Arena-web-banner.png';

const HeroSlider = () => {

  // <PrimaryButton className="text-sm" onClick={() => {
  // }}>Shop Now</PrimaryButton>
  // <PrimaryButton className="text-md" onClick={() => {
  // }}>Shop Now</PrimaryButton>
  // <PrimaryButton className="text-lg" onClick={() => {
  // }}>Shop Now</PrimaryButton>
  // <SecondaryButton  className="text-sm" onClick={() => {
  // }}>Show Now</SecondaryButton>
  // <SecondaryButton  className="text-md" onClick={() => {
  // }}>Show Now</SecondaryButton>
  // <SecondaryButton  className="text-lg" onClick={() => {
  // }}>Show Now</SecondaryButton>

    return (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <img src={heroImage} className='w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={heroImage} className='w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={heroImage} className='w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={heroImage} className='w-full' />
          </SwiperSlide>
        </Swiper>
    );
}

export default HeroSlider;