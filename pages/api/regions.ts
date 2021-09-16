import { fetchToken } from "helpers/fetch-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = "http://villageibook-api.abosit.com";

async function handler(req, res) {
  const { access_token } = await fetchToken();

  switch (req.method) {
    case "GET":
      return getRegions();
    case "POST":
      return createRegion();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getRegions() {
    try {
      await fetchWrapper.get(baseUrl + "/regions.json", access_token)
      .then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createRegion() {
    try {
      fetchWrapper.post(baseUrl + "/regions", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
