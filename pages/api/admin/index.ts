import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { type, uuid } = req.query;
  
  switch (req.method) {    
    case "DELETE":
        return deleteObj();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function deleteObj() {
    try {
      fetchWrapper.delete(baseUrl + `/${type}/${uuid}`, access_token);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
