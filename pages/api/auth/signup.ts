import axios from "axios";
import querystring from "querystring";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  // console.log("body", body);

  headers.authorization = `Bearer ${body.token}`;
  headers["content-type"] = "application/json";

  const params = JSON.stringify({
    firstName: body.firstname,
    lastName: body.lastname,
    email: body.email,
    password: body.password,
  });

  try {
    const { data, headers: returnedHeaders } = await axios.post(
      "http://villageibook-api.abosit.com/signup", // api backend path
      params,
      { headers } // Headers from the Next.js Client
    );
    //  Update headers on requester using headers from Node.js server response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    );

    res.send(data); // Send data from Node.js server response
  } catch ({ response: { status, data } }) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(status).json(data);
  }
};
