import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getPersonalities();
    case "POST":
      return createPersonality();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getPersonalities() {
    try {
      let personality = fetchWrapper.get(baseUrl + "/personalities.json", access_token);
      
      await personality.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createPersonality() {
    try {
      fetchWrapper.post(baseUrl + "/personalities", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
