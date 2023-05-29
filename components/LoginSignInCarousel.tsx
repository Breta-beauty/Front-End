"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function LoginSignInCarousel() {
  const images = [
    {
      image:
        "/images/see-you-soon-cropped-shot-of-a-handsome-young-bar-2023-01-04-20-37-56-utc 1.png",
        title:"Gestiona tu salón y automatiza tus citas",
      text: "Con BRETA gestiona a tu equipo, los servicios que ofreces y la forma en la que gestionas tus citas.",
    },
    {
      image:
        "/images/hairdresser-checking-her-schedule-2022-04-27-01-52-24-utc 1.png",
        title:"Monitorea tus estadísticas ",
      text: "Revisa tu progreso con gráficas claras y fáciles de entender, detecta áreas de oportunidad y aprovecha tus fortalezas.",
    },
    {
      image:
        "/images/dyeing-hair-in-hairdressing-salon-2021-08-26-15-43-19-utc 1.png",
        title:"Promueve tus servicios",
      text: "Podrás crear promociones para incentivar tus servicios y darte a conocer.",
    },
    {
      image:
      "/images/asian-young-asian-woman-setting-open-sign-at-the-s-2022-12-16-03-21-34-utc 1.png",
        title:"Proyecta tu negocio e incrementa tus citas",
      text: "Con BRETA como pinto de venta, llegarás a más clientes y darás a conocer tus servicios y promociones.",
    },

  ];
  return (
    <div className="h-full w-2/3">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        direction="horizontal"
        loop={true}
        className="h-full"
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide className="h-full">
              <div className="absolute bottom-10 left-10 flex flex-col text-white z-50">
                <div className="text-2xl font-bold tracking-wide">{image.title}</div>
                <div className="">{image.text}</div>
              </div>
              <div className="absolute h-full w-full bg-gradient-to-bl from-transparent to-stone-900 z-40 opacity-30"></div>
              <img
                src={image.image}
                className="transition ease-out object-cover w-full"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
