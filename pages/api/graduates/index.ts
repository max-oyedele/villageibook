import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { locationUuid } = req.query; //location uuid
  const { universityCountries } = req.query;

  switch (req.method) {
    case "GET":
      return getGraduates();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getGraduates() {
    try {
      let graduate = fetchWrapper.get(baseUrl + `/stats/graduates-by-location.json?universityCountries=${universityCountries}${locationUuid ? "&locationUuid=" + locationUuid : ""}`, access_token);

      await graduate.then(response => {
        res.status(200).json(response);
      })
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
