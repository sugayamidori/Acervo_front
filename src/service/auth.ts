import { fetchAPI } from ".";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";

import { setCookieLogin } from "@acervo/utils/auth";
import { loginFormInputsProps } from "@acervo/modules/auth/components/login-form/types";
import { registerFormInputsProps } from "@acervo/modules/auth/components/register-form/types";

export const authRegisterMember = async ({
  username,
  email,
  password,
}: registerFormInputsProps) => {
  const registerRequestMember = {
    login: username,
    email,
    senha: password,
  };

  const response = await fetchAPI({
    url: "usuarios/membros",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerRequestMember),
    },
  });

  return response.status === 201;
};

export const authRegisterAdmin = async (
  { username, email, password, roles }: registerFormInputsProps,
  context?: Partial<GetServerSidePropsContext>
) => {
  const token = getCookie("access_token", context);

  const registerAdminOrLibrarian = {
    login: username,
    email,
    senha: password,
    roles,
  };

  const response = await fetchAPI({
    url: "usuarios",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(registerAdminOrLibrarian),
    },
  });

  return response.status === 201;
};

export const authLogin = async ({
  email,
  password,
}: loginFormInputsProps): Promise<boolean> => {
  const loginRequest = {
    email,
    senha: password,
  };

  const response = await fetchAPI({
    url: "usuarios/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    },
  });

  if (response.status === 200) {
    await setCookieLogin({ response });
    return true;
  }
  return false;
};
