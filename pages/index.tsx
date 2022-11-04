import { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import MediaViewer from "../components/media-viewer"
import { PathLike, promises as fs } from "fs"
import path from "path"

const useWidth = () => {
  const [width, setWidth] = useState(0) // default width
  const handleResize = () => setWidth(window.innerWidth)
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])
  return width
}

const useHeight = () => {
  const [height, setHeight] = useState(0) // default height
  const handleResize = () => setHeight(window.innerHeight)
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])
  return height
}

export default function IndexPage({ boothFiles }: { boothFiles: any }) {
  const vr = useRef<HTMLIFrameElement>(null)

  const windowWidth = useWidth()
  const windowHeight = useHeight()

  // useEffect(() => {
  //   vr.current!.src += ""
  // }, [vr, windowWidth, windowHeight])

  return (
    <Layout>
      {/* <h1>NextAuth.js Example</h1> */}
      <div className="row-container">
        <iframe
          src="https://stream.robocore.ai:5443/LiveApp/play.html?name=stream1&is360=true"
          width="1400"
          height="740"
        />
        <MediaViewer boothFiles={boothFiles} />
      </div>
      <div>
        <div className="row-container">
          <iframe
            className="temi-control"
            src="http://16.163.180.160:8000/"
            width="480"
            height="270"
          />
          <iframe
            src="https://stream.robocore.ai:5443/LiveApp/play.html?name=temi1"
            width="400"
            height="300"
          ></iframe>
          <iframe
            src="https://stream.robocore.ai:5443/WebRTCAppEE/play.html?name=room1Merged"
            width="900"
            height="300"
          ></iframe>
        </div>
      </div>

      {/* <div>
          <iframe
            width="850"
            height="590"
          />
        </div> */}

      {/* <iframe
        ref={vr}
        src="http://18.163.8.140:8081/index.html"
        width="80%"
        height="50%"
      />
      <iframe src="http://18.163.8.140:5000/" width="50%" height="30%" /> */}
      {/* <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p> */}
    </Layout>
  )
}

export async function getServerSideProps() {
  const mediaDirectory = path.join(process.cwd(), "public", "media")

  const fileExists = async (path: PathLike) =>
    !!(await fs.stat(path).catch((e) => false))

  if (!(await fileExists(mediaDirectory))) {
    await fs.mkdir(mediaDirectory)
  }

  const dirents = await fs.readdir(mediaDirectory, { withFileTypes: true })
  const boothDirNames = dirents
    .map((dirent) => {
      if (
        dirent.isDirectory() &&
        dirent.name.toLowerCase().startsWith("booth")
      ) {
        return dirent.name
      }
    })
    .filter((dir) => dir !== undefined)

  const boothFiles = await Promise.all(
    boothDirNames.map(async (boothDirName) => {
      if (boothDirName !== undefined) {
        const boothDirPath = path.join(mediaDirectory, boothDirName)

        const boothFilenames = await fs.readdir(boothDirPath)

        const boothFilepaths = boothFilenames.map((boothFilename) => {
          return path.join(boothDirPath, boothFilename)
        })
        // const fileContents = await fs.readFile(path.join(boothDirPath, boothDirFiles[0]), "utf8")

        const forwardSlashFilepaths = boothFilepaths.map((filepath) => {
          return "/media" + filepath.replace(/\\/g, "/").split("/media")[1]
        })

        return {
          filepaths: forwardSlashFilepaths,
        }
      }
    })
  )

  // // By returning { props: { posts } }, the Blog component
  // // will receive `posts` as a prop at build time
  return {
    props: {
      boothFiles,
    },
  }
}
