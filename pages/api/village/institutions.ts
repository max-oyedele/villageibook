import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { villageUuid } = req.query; //village uuid

  switch (req.method) {
    case "GET":
      return getVillageInstitutions();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getVillageInstitutions() {
    try {
      let villageInstitution = fetchWrapper.get(baseUrl + `/villages/${villageUuid}/institutions.json?fields=name,photo.url,photo.name,photo.description,yearEstablished,address,email,phone,history,uuid`, access_token);
      
      await villageInstitution.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
