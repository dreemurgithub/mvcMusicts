import express, { Request, Response, Application } from "express";
import { musicYoutubeSearch } from "@/models/musicInfor";
import { downloadSong ,} from "@/models/musicInfor";
// import { downloadMusicCheck } from "@/models/musicInfor/download";


export const musicInforController: Application = express();
export const musicDownloadController: Application = express();

musicInforController.use(async (req: Request, res: Response) => {
  const { search, page } = req.query;
  const check =
    search &&
    page &&
    typeof search == "string" &&
    typeof page == "string" &&
    parseInt(page);
  if (check) {
    const result = await musicYoutubeSearch({ search, page: parseInt(page) });
    if (result.success) return res.status(201).send(result.data);
    else return res.status(400).send({ message: result.message });
  }
  res.status(400).send({ message: "Something wrong with searching music" });
});

musicDownloadController.use(async (req: Request, res: Response) => {
  const { songId } = req.query;
  
  if(songId && typeof songId === 'string'){
    const result = await downloadSong(songId)
     if(result?.success)return res.status(200).send(result.data)

    } else res.send({message: 'Bad youtubeId/ Request'})
});