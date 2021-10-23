import axios from "axios";
import { fetchClientToken } from "helpers/fetch-client-token";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { headers, body } = req;
  // console.log("body", body);

  const { access_token } = await fetchClientToken();
  
  const params = JSON.stringify({
    firstName: body.firstname,
    lastName: body.lastname,
    email: body.email,
    password: body.password,
  });

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + '/signup',      
      params,
      {
        headers: {
          "authorization": "Bearer " + access_token,
          "content-type": "application/json"
        }
      }
    );

    res.send(data); // Send data from Node.js server response
  } catch (error) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(401).json(error.response?.data);
  }
};

export default handler;