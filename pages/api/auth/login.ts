import axios from "axios";
import querystring from "querystring";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  // console.log('body', body)

  const params = querystring.stringify({
    username: body.email,
    password: body.password,
    grant_type: "password",
    client_id: "villageibook-client",
    client_secret: "4C6JYPsCJ795vFVS",
  });

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      "https://villageibook-api.abosit.com/oauth/token", // api backend path
      params,
      {
        headers: {
          "authorization": "Basic " + Buffer.from("villageibook-client" + ":" + "4C6JYPsCJ795vFVS").toString("base64"),
          "content-type": "application/x-www-form-urlencoded"
        }
      }
    );
    
    res.send(data); // Send data from Node.js server response
  } catch (error) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(401).json(error.response?.data)
  }
};