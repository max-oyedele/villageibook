import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req: any, res: any) {
  const { authorization } = req.headers;
  const { endpoint, searchParams } = req.query;
  const search = new URLSearchParams(
    searchParams ? JSON.parse(searchParams) : ""
  ).toString();

  let url = baseUrl;
  if (endpoint) url += `${endpoint}`;
  if (search) url += `?${search}`;

  console.log("url", url);

  axios.defaults.headers.common = { Authorization: authorization };

  switch (req.method) {
    case "GET":
      return getRequest();
    case "DELETE":
      return deleteRequest();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getRequest() {
    try {
      const response = await axios.get(url);
      // console.log('response', response.data)
      res.status(response.status).json(response.data);
    } catch (error) {
      console.log("error", error.response.data)
      return res.status(error.response.status).json(error);
    }
  }

  async function deleteRequest() {
    try {
      axios.delete(url);
      return res.status(200).json({result: "ok"});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
