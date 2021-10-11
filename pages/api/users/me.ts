import { fetchUserToken } from "helpers/fetch-user-token";
import { fetchWrapper } from "helpers/fetch-wrapper";

import { usersRepo } from "helpers/user-repo";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function handler(req, res) {
  const {username, password} = req.query;

  const { access_token } = await fetchUserToken({username: username, password: password});

  switch (req.method) {
    case "GET":
      return getMe();
    
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getMe() {
    try {
      let me = fetchWrapper.get(
        baseUrl + `/users/${req.query.uuid}.json`,
        access_token
      );

      await me.then((response) => {
        res.status(200).json(response);
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default handler;