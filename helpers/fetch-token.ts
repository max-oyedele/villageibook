import querystring from "querystring";
import axios from "axios";

export async function fetchToken() {
  const params = querystring.stringify({
    grant_type: "client_credentials",
    scope: "read write",
    client_id: "villageibook-client",
    client_secret: "4C6JYPsCJ795vFVS",
  });

  try {
    const { data } = await axios.post(
      "https://villageibook-api.abosit.com/oauth/token",
      params,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              "villageibook-client" + ":" + "4C6JYPsCJ795vFVS"
            ).toString("base64"),
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}
