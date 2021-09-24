import { fetchToken } from "helpers/fetch-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = "https://villageibook-api.abosit.com";

async function handler(req, res) {
  const { access_token } = await fetchToken();
  const { region } = req.query;

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
      let district = fetchWrapper.get(baseUrl + "/districts.json", access_token);
      
      if(region){
        const href = JSON.parse(region)?.href;
        district = fetchWrapper.get(baseUrl + `/region/[href=${href}]/districts.json`, access_token);
      }

      await district.then(response=>{
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
