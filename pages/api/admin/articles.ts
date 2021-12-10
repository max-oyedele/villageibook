import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getStories();
    case "POST":
      return createStory();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getStories() {
    try {
      let story = fetchWrapper.get(baseUrl + "/stories.json", access_token);
      
      await story.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createStory() {
    try {
      fetchWrapper.post(baseUrl + "/stories", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
