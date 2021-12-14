import { fetchClientToken } from "helpers/fetch-client-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = await fetchClientToken();
  
  switch (req.method) {
    case "GET":
      return getDegrees();
    case "POST":
      return createDegree();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getDegrees() {
    try {
      let degree = fetchWrapper.get(baseUrl + "/admin/schema/relationships/GRADUATED_AT.json?page=1&size=20", access_token);
      
      await degree.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createDegree() {
    try {
      fetchWrapper.post(baseUrl + "/degrees", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
