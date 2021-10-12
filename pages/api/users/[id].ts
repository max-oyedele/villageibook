import { fetchClientToken } from "helpers/fetch-client-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

import { usersRepo } from "helpers/user-repo";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const { access_token } = req.query || (await fetchClientToken());

  switch (req.method) {
    case "GET":
      return getUserById();
    case "PUT":
      return updateUser();
    case "DELETE":
      return deleteUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  async function getUserById() {
    try {
      let user = fetchWrapper.get(
        baseUrl + `/users/${req.query.id}.json`,
        access_token
      );

      await user.then((response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function updateUser() {
    try {
      //   usersRepo.update(req.query.id, req.body);
      return res.status(200).json({});
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  function deleteUser() {
    // usersRepo.delete(req.query.id);
    return res.status(200).json({});
  }
}

export default handler;
