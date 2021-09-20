import { fetchToken } from "helpers/fetch-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = "https://villageibook-api.abosit.com";

async function handler(req, res) {
  const { access_token } = await fetchToken();

  switch (req.method) {
    case "GET":
      return getDistricts();
    case "POST":
      return createDistrict();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getDistricts() {
    try {
      await fetchWrapper.get(baseUrl + "/districts.json", access_token)
      .then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createDistrict() {
    try {
      fetchWrapper.post(baseUrl + "/districts", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
