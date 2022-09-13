import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import { PathLike, promises as fs } from "fs"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const mediaDirectory = path.join(process.cwd(), "public", "media")

  const fileExists = async (path: PathLike) =>
    !!(await fs.stat(path).catch((e) => false))

  const jsonPath = path.join(mediaDirectory, "/directory.json")

  if (!(await fileExists(mediaDirectory))) {
    await fs.mkdir(mediaDirectory)
  }

  if (!(await fileExists(jsonPath))) {
    await fs.writeFile(jsonPath, JSON.stringify({ file_count: 0 }, null, 4))
  }

  const fileContents = await fs.readFile(jsonPath, "utf8")

  console.log(fileContents)

  res.send({
    content: "OK",
  })
}
