import axios from "axios";
import querystring from "querystring";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { headers, body } = req;
  // console.log('body', body)

  const params = querystring.stringify({
    username: body.email,
    password: body.password,
    grant_type: "password",
    client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
  });

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/oauth/token", // api backend path
      params,
      {
        headers: {
          authorization:
            "Basic " +
            Buffer.from(
              `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET}`
            ).toString("base64"),
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.send(data); // Send data from Node.js server response
  } catch (error) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(401).json(error.response?.data);
  }
};

export default handler;