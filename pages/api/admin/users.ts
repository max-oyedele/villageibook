import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  
  switch (req.method) {
    case "GET":
      return getUsers();
    // case "POST":
    //   return createUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getUsers() {
    try {
      let user = fetchWrapper.get(baseUrl + "/users.json", access_token);
      
      await user.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createUser() {
    try {
      fetchWrapper.post(baseUrl + "/users", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
