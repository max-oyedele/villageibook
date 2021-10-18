import cookieCutter from "cookie-cutter";

export const getUserToken = () => {
  let jwtFromCookie = cookieCutter.get("jwt");
  if (jwtFromCookie) {
    jwtFromCookie = JSON.parse(jwtFromCookie);
  }
  return jwtFromCookie?.access_token;
}

