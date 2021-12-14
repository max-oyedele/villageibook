import { fetchClientToken } from "helpers/fetch-client-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = await fetchClientToken();
  
  switch (req.method) {
    case "GET":
      return getUniversities();
    case "POST":
      return createUniversity();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUniversities() {
    try {
      let university = fetchWrapper.get(baseUrl + "/universities.json?page=1&size=9220", access_token);
      
      await university.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createUniversity() {
    try {
      fetchWrapper.post(baseUrl + "/universities", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
