import axios from "axios";
import { fetchToken } from "helpers/fetch-token";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers, body } = req;
  // console.log("body", body);

  const { access_token } = await fetchToken();   
  
  try {
    let params = JSON.stringify({
      degree: body.education.degree.value,    
      university: body.education.university,
      graduatedIn: body.education.graduatedIn.name,
      // avatar: body.avatar
    });

    await axios.patch(
      `https://villageibook-api.abosit.com/users/${body.uuid}`, 
      params,
      {
        headers: {
          "authorization": "Bearer " + access_token,
          "content-type": "application/json"
        }
      }
    );

    params = JSON.stringify({
      name: body.education.graduatedIn.name,    
    });
    await axios.post(
      `https://villageibook-api.abosit.com/users/${body.uuid}/GRADUATED_IN/countries`, 
      params,
      {
        headers: {
          "authorization": "Bearer " + access_token,
          "content-type": "application/json"
        }
      }
    );

    params = JSON.stringify({
      name: body.location.village.name,
    });
    await axios.post(
      `https://villageibook-api.abosit.com/users/${body.uuid}/JOINED/villages`, 
      params,
      {
        headers: {
          "authorization": "Bearer " + access_token,
          "content-type": "application/json"
        }
      }
    );

    res.send({result: "success"}); // Send data from Node.js server response
  } catch (error) {
    // Send status (probably 401) so the axios interceptor can run.
    res.status(401).json(error.response?.data);
  }
};