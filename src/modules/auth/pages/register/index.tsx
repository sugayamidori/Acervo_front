"use client";

import Image from "next/image";

import { Logo } from "@acervo/constants/index";
import { RegisterForm } from "@acervo/modules/auth/components/register-form/index";

const Register = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Image src={Logo.logo} alt={Logo.title} width={282} height={45} />
      <h1 className="text-3xl md:text-4xl font-semibold my-14">
        Crie sua conta
      </h1>
      <main className="flex w-4/5 md:w-lg items-center justify-center">
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
