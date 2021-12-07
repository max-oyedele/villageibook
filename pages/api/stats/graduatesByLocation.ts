import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { villageUuid } = req.query; //village uuid
  const { locations } = req.query;
  
  // console.log('villageUuid', villageUuid);
  // console.log('locations', locations);

  switch (req.method) {
    case "GET":
      return getGraduatesByLocation();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getGraduatesByLocation() {
    try {
      let graduatesByLocation = fetchWrapper.get(baseUrl + `/stats/graduates-by-location.json?locations=${locations}${villageUuid ? "&village=" + villageUuid : ""}`, access_token);

      await graduatesByLocation.then(response => {
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
