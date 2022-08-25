import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import Image from "next/image"
import ReactPlayer from "react-player"

const image = "https://source.unsplash.com/featured/300x201"

export default function MediaViewer() {
  const images = new Array(1).fill({ url: image })
  return (
    <div className="image-viewer">
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          className="external-buttons"
          spaceBetween={24}
          slidesPerView={1}
          navigation
          updateOnWindowResize
          observer
          observeParents
          initialSlide={1}
          loop
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                height="200"
                width="300"
                alt="img"
                className="image"
                src={image.url}
              />
            </SwiperSlide>
          ))}

          <SwiperSlide>
            <Image src="/robocore_logo.png" width="850" height="590" />
          </SwiperSlide>

          <SwiperSlide>
            <ReactPlayer
              width="850px"
              height="590px"
              className="react-player"
              url="https://www.youtube.com/watch?v=wWgIAphfn2U"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    // <div>
    //   <Image src="/robocore_logo.png" width="850" height="590" />
    //   <ReactPlayer
    //     width="850px"
    //     height="590px"
    //     className="react-player"
    //     url="https://www.youtube.com/watch?v=wWgIAphfn2U"
    //   />
    // </div>
  )
}
