import { fetchWrapper } from "helpers/fetch-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query;
  const { type } = req.query;
  const { fields } = req.query;

  switch (req.method) {
    case "GET":
      return getObjById();
    case "PUT":
      return updateObj();
    case "DELETE":
      return deleteObj();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getObjById() {
    try {
      let user = fetchWrapper.get(
        baseUrl + `/${type}/${req.query.id}.json${fields}`,
        access_token
      );

      await user.then((response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function updateObj() {
    try {
      //   usersRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function deleteObj() {
    // usersRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}

export default handler;
