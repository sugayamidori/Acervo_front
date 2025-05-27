import { setCookie, deleteCookie } from "cookies-next";

import { COOKIE_TOKEN, COOKIE_LOGIN } from "@acervo/constants/cookies";
import { LoginAuthReponse, SetCookiesLoginProps } from "@acervo/types/auth";

export const setCookieLogin = async ({ response }: SetCookiesLoginProps) => {
  const { access_token, usuario }: LoginAuthReponse = await response.json();

  setCookie(COOKIE_TOKEN, access_token, {
    path: "/",
    maxAge: 90 * 60,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  setCookie(COOKIE_LOGIN, usuario, {
    path: "/",
    maxAge: 90 * 60,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};

export const clearToken = async () => {
  deleteCookie(COOKIE_TOKEN);
};
