import { fetchAPI } from ".";
import { setCookiesLogin } from "@acervo/utils/auth";
import { loginFormInputsProps } from "@acervo/modules/auth/components/login-form/types";

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
    await setCookiesLogin({ response });
    return true;
  }
  return false;
};
