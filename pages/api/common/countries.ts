import { fetchClientToken } from "helpers/fetch-client-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = await fetchClientToken();
  
  switch (req.method) {
    case "GET":
      return getCountries();
    // case "POST":
    //   return createCountry();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCountries() {
    try {
      let country = fetchWrapper.get(baseUrl + "/countries.json?page=1&size=210", access_token);
      
      await country.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createCountry() {
    try {
      fetchWrapper.post(baseUrl + "/countries", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
