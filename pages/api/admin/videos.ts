import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getVideos();
    case "POST":
      return createVideo();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getVideos() {
    try {
      let video = fetchWrapper.get(baseUrl + "/videos.json", access_token);
      
      await video.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createVideo() {
    try {
      fetchWrapper.post(baseUrl + "/videos", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
