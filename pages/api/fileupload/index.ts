import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import { PathLike, promises as fs } from "fs"
import formidable, { File } from "formidable"

export const config = {
  api: {
    bodyParser: false,
  },
}

type ProcessedFiles = Array<[string, File]>

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = { status: "ok", message: "Files were uploaded successfully" }

  let booth = "-1"
  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm()
      const files: ProcessedFiles = []

      form.on("field", function (name, field) {
        // console.log("Got a field:", field)
        // console.log("Got a field name:", name)
        if (name == "booth") {
          booth = field
        }
      })

      form.on("file", function (field, file) {
        files.push([field, file])
      })

      form.on("end", () => resolve(files))
      form.on("error", (err) => reject(err))
      form.parse(req, () => {
        //
      })
    }
  ).catch((e) => {
    console.log(e)
    status = 500
    resultBody = {
      status: "fail",
      message: "Upload error",
    }
  })

  if (files?.length) {
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), "public", "media", "booth_" + booth)
    try {
      await fs.access(targetPath)
    } catch (e) {
      await fs.mkdir(targetPath)
    }

    /* Move uploaded files to directory */
    for (const file of files) {
      const tempPath = file[1].filepath
      await fs.rename(tempPath, path.join(targetPath, file[1].originalFilename!))
    }
  }

  res.status(status).json(resultBody)
}
