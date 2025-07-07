import './panelPrincipal.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function () {
  return (
    <div className='container-panel-principal'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper container-panel-principal"
      >
        <SwiperSlide className='swiper-center'><img className='img-panel' src="/temp/1.png" /></SwiperSlide>
        <SwiperSlide className='swiper-center'><img className='img-panel' src="/temp/2.png" height={500} /></SwiperSlide>
        <SwiperSlide className='swiper-center'><img className='img-panel' src="/temp/3.png" height={500} /></SwiperSlide>
      </Swiper>
    </div>
  )
}
