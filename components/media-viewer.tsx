import React from "react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import Image from "next/image"
import ReactPlayer from "react-player"
import { Key } from "react"

import { Dropdown } from "@nextui-org/react"

// const image = "https://source.unsplash.com/featured/300x201"

export default function MediaViewer({ boothFiles }: { boothFiles: any }) {
  console.log(boothFiles)

  /** Booth dropdown */
  const [selected, setSelected] = React.useState(new Set(["1"]))

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  )
  /** Booth dropdown END */

  console.log(parseInt(selectedValue))

  // const images = new Array(1).fill({ url: image })
  return (
    <div className="image-viewer">
      <h3>Select booth:</h3>
      <Dropdown>
        <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
          {selectedValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <Dropdown.Item key="1">1</Dropdown.Item>
          <Dropdown.Item key="2">2</Dropdown.Item>
          <Dropdown.Item key="3">3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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
          {/* {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                height="200"
                width="300"
                alt="img"
                className="image"
                src={image.url}
              />
            </SwiperSlide>
          ))} */}

          {boothFiles[parseInt(selectedValue) - 1].filepaths.map(
            (filepath: any, index: Key | null | undefined) => (
              <SwiperSlide key={index} style={{ width: 400, height: 720 }}>
                <Image src={filepath} layout={"fill"} objectFit={"contain"} />
              </SwiperSlide>
            )
          )}

          {/* <SwiperSlide>
            <Image src="/robocore_logo.png" width="850" height="590" />
          </SwiperSlide> */}

          <SwiperSlide>
            <ReactPlayer
              width="400px"
              height="400px"
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
