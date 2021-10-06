import { fetchToken } from "helpers/fetch-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = await fetchToken();
  const { subDistrict } = req.query;

  switch (req.method) {
    case "GET":
      return getVillages();
    case "POST":
      return createVillage();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getVillages() {
    try {
      let village = fetchWrapper.get(baseUrl + "/villages.json", access_token);
      if (subDistrict) {
        const href = JSON.parse(subDistrict)?.href;
        village = fetchWrapper.get(baseUrl + `/sub-district/[href=${href}]/villages.json`, access_token);
      }

      await village.then((response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createVillage() {
    try {
      fetchWrapper.post(baseUrl + "/villages", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
