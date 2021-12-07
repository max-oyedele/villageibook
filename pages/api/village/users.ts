import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { villageUuid } = req.query; //village uuid

  switch (req.method) {
    case "GET":
      return getVillageUsers();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getVillageUsers() {
    try {
      let villageUser = fetchWrapper.get(baseUrl + `/villages/${villageUuid}/users.json`, access_token);
      
      await villageUser.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
