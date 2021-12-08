import cookieCutter from "cookie-cutter";

export const getUserToken = () => {
  let jwtFromCookie = cookieCutter.get("jwt");
  if (jwtFromCookie) {
    jwtFromCookie = JSON.parse(jwtFromCookie);

    // const expires = jwtFromCookie.expires;
    // if (new Date().getTime() >= new Date(expires).getTime()) {
    //   removeUserToken();
    //   return null;
    // }

    return jwtFromCookie.access_token;
  }
  return null;
};

export const setUserToken = (jwt) => {
  const token = {...jwt};
  const expires = new Date().getTime() + jwt.expires_in * 1000;
  // const expires = new Date().getTime() + 120 * 1000; //2min
  token["expires"] = expires;
  cookieCutter.set("jwt", JSON.stringify(token), { expires: new Date(expires) });
};

export const removeUserToken = () => {
  cookieCutter.set("jwt", "", {expires: new Date(0)});
}
