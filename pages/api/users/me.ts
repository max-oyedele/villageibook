import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;

  switch (req.method) {
    case "GET":
      return getMe();
    case "PUT":
      return updateMe();

    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  async function getMe() {
    try {
      await fetchWrapper
        .get(baseUrl + `/users/me.json`, access_token)
        .then((response) => {
          res.status(200).json(response);
        });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function updateMe() {
    try {
      //   usersRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;
