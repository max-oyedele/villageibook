import axios from "axios";
import querystring from "querystring";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  
  headers["authorization"] =
    "Basic " +
    Buffer.from("villageibook-client" + ":" + "4C6JYPsCJ795vFVS").toString(
      "base64"
    );
  headers["content-type"] = "application/x-www-form-urlencoded";

  const params = querystring.stringify({
    grant_type: "client_credentials",
    scope: "read write",
    client_id: "villageibook-client",
    client_secret: "4C6JYPsCJ795vFVS"
  });

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      // 'http://localhost:3001/auth/refresh-token', // refresh token Node.js server path
      "http://villageibook-api.abosit.com/oauth/token", // get token server path
      params,
      {
        headers,
      }
    );

    //  Update headers on requester using headers from Node.js server response
    Object.keys(returnedHeaders).forEach((key) =>
      res.setHeader(key, returnedHeaders[key])
    );
    
    res.status(200).json(data);
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error);
  }
};
