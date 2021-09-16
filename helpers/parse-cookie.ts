import cookie from "cookie";

export const parseCookie: (cookieStr: string) => any = (cookieStr) => {
  return cookie.parse(cookieStr);
};
