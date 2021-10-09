import axios from "axios";
var FormData = require('form-data');
var formidable = require('formidable');
const util = require("util");
const multer = require("multer");
let multiparty = require('multiparty')
const Busboy = require('busboy');

import { fetchUserToken } from "helpers/fetch-user-token";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  // console.log("body", body);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { access_token } = await fetchUserToken({username: "test6@gmail.com", password: "123"});
  
  try {
    
    const response = await axios.patch(
      `${baseUrl}/users/${body.uuid}`,
      body,
      {
        headers: {
          authorization: "Bearer " + access_token,
          "content-type": `multipart/form-data`
        },
      }
    );

    res.send(response.data);
  } catch (error) {
    // Send status (probably 401) so the axios interceptor can run.
    console.log('errr', error.response)
    res.status(401).json(error.response?.data);
  }
};
