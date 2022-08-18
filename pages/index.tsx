import { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"

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

export default function IndexPage() {
  const vr = useRef<HTMLIFrameElement>(null)

  const windowWidth = useWidth()
  const windowHeight = useHeight()

  // useEffect(() => {
  //   vr.current!.src += ""
  // }, [vr, windowWidth, windowHeight])

  return (
    <Layout>
      {/* <h1>NextAuth.js Example</h1> */}
      <iframe
        src="https://stream.robocore.ai:5443/LiveApp/play.html?name=stream1&is360=true"
        width="1800"
        height="630"
      />
      <iframe src="http://18.166.70.71:8000/" width="480" height="270" />
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
