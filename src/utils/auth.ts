import { setCookie } from "cookies-next";

import { COOKIE_TOKEN } from "@acervo/constants/cookies";
import { LoginAuthReponse, SetCookiesLoginProps } from "@acervo/types/auth";

export const setCookiesLogin = async ({ response }: SetCookiesLoginProps) => {
  const { access_token }: LoginAuthReponse = await response.json();

  setCookie(COOKIE_TOKEN, access_token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
