"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";


export default function SalonCarousel() {
      
    const pagination = {
        horizontalClass: "swiper-pagination-salonCarousel",
        clickable: true,
        bulletClass: 'swiper-pagination-bullet-salonCarousel',
        bulletActiveClass: 'swiper-pagination-bullet-active-salonCarousel',
        renderBullet: function (index: any, className: any) {
          return `<span class=" ${className}"></span>`;
        },
      };

    return (
        <>
        <div className="relative w-full h-full">
        <Swiper
                modules={[Pagination]}
                pagination={pagination}
                direction="horizontal"
                loop={true}
                className=" w-full h-full"
                >
                    <SwiperSlide
                    className={`relative h-full w-full bg-cover bg-MobileCarouselImage1 md:bg-salonCarouselImage0`}
                    >
                    </SwiperSlide>
                    <SwiperSlide
                    className={`relative h-full w-full bg-cover bg-MobileCarouselImage1 md:bg-salonCarouselImage1`}
                    >
                    </SwiperSlide>
                    <SwiperSlide
                    className={`relative h-full bg-cover bg-MobileCarouselImage2 md:bg-salonCarouselImage2`}
                    >
                    </SwiperSlide>
                    <SwiperSlide
                    className={`relative h-full bg-cover bg-MobileCarouselImage3 md:bg-salonCarouselImage3`}
                    >
                    </SwiperSlide>
                    <SwiperSlide
                    className={`relative h-full bg-cover bg-MobileCarouselImage3 md:bg-salonCarouselImage3`}
                    >
                        
                    </SwiperSlide>
                </Swiper>
        </div>
                
        </>
      );  
    }