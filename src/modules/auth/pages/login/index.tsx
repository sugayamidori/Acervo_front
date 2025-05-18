"use client";

import Image from "next/image";

import { Logo } from "@acervo/constants/index";
import { LoginForm } from "@acervo/modules/auth/components/login-form/index";

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Image src={Logo.logo} alt={Logo.title} width={282} height={45} />
      <h1 className="text-3xl md:text-4xl font-semibold my-14">
        Acesse sua conta
      </h1>
      <main className="flex w-4/5 md:w-lg items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
};

export default Login;
