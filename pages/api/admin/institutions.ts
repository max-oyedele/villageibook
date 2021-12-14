import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { villageUuid } = req.query;
  
  switch (req.method) {
    case "GET":
      return getInstitutions();
    // case "POST":
    //   return createInstitution();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getInstitutions() {
    try {
      let institution = fetchWrapper.get(baseUrl + `${villageUuid ? `/villages/${villageUuid}/HAS_INSTITUTION` : ""}/institutions.json?fields=name,photo.url,photo.name,photo.description,yearEstablished,address,email,phone,history,uuid`, access_token);
      
      await institution.then(response=>{
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async function createInstitution() {
    try {
      fetchWrapper.post(baseUrl + "/institutions", req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
