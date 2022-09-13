import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { PathLike, promises as fs } from 'fs'
import path from 'path'

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

export async function getServerSideProps() {
  const mediaDirectory = path.join(process.cwd(), "public", "media")

  const fileExists = async (path: PathLike) =>
    !!(await fs.stat(path).catch((e) => false))

  if (!(await fileExists(mediaDirectory))) {
    await fs.mkdir(mediaDirectory)
  }

  const filenames = await fs.readdir(mediaDirectory)
  console.log("yoooo")
  console.log(filenames)

  // const posts = filenames.map(async (filename) => {
  //   const filePath = path.join(postsDirectory, filename)
  //   const fileContents = await fs.readFile(filePath, 'utf8')

  //   // Generally you would parse/transform the contents
  //   // For example you can transform markdown to HTML here

  //   return {
  //     filename,
  //     content: fileContents,
  //   }
  // })
  // // By returning { props: { posts } }, the Blog component
  // // will receive `posts` as a prop at build time
  return {
    props: {
      // posts: await Promise.all(posts),
    },
  }
}
