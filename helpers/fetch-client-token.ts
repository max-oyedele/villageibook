import querystring from "querystring";
import axios from "axios";

export async function fetchClientToken() {
  const params = querystring.stringify({
    grant_type: "client_credentials",
    scope: "read write",
    client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
  });

  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/oauth/token",
      params,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET}`
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
