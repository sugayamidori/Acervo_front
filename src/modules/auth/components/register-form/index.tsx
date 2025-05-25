"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";

import { ROLE, USER_TYPES } from "@acervo/constants/roles";

import { Button } from "@acervo/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@acervo/components/ui/form";
import { Input } from "@acervo/components/ui/input";
import { Loader } from "@acervo/components/loader/index";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@acervo/components/ui/select";
import { toast } from "sonner";

import { registerFormInputsProps } from "./types";
import { registerAdminSchema } from "./schemas";
import { authRegisterAdmin, authRegisterMember } from "@acervo/service/auth";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const roles = Object.values(ROLE);
  const pathname = usePathname();
  const router = useRouter();

  const userType = pathname.includes("/admin")
    ? USER_TYPES.admin
    : pathname.includes("/librarian")
    ? USER_TYPES.librarian
    : USER_TYPES.member;

  const shouldShowSelect =
    userType === USER_TYPES.admin || userType === USER_TYPES.librarian;

  const schema = registerAdminSchema();
  const form = useForm<registerFormInputsProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roles: [],
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: registerFormInputsProps) => {
    let success = false;
    if (userType === USER_TYPES.admin) {
      success = await authRegisterAdmin(data);
    } else if (userType === USER_TYPES.member) {
      success = await authRegisterMember(data);
    }

    if (success) {
      toast.success("Usuário cadastrado com sucesso!", {
        position: "bottom-right",
        style: { backgroundColor: "white", color: "#000", border: "none" },
      });
      return router.push("/login");
    } else {
      toast.error("Não foi possível cadastrar esse usuário", {
        position: "bottom-right",
        style: { backgroundColor: "white", color: "#000", border: "none" },
      });
    }
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="username">Nome</FormLabel>
              <FormControl
                className={fieldState.error && "focus-visible:ring-rose-600"}
              >
                <Input
                  id="username"
                  type="text"
                  autoCapitalize="none"
                  autoFocus
                  spellCheck={false}
                  className="rounded-[4px] bg-[#F7F7F7] border-1 border-[#707070]"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute text-red-500 bottom-[-18px] right-0 block text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="mt-5">
                E-mail
              </FormLabel>
              <FormControl
                className={fieldState.error && "focus-visible:ring-rose-600"}
              >
                <Input
                  id="email"
                  inputMode="email"
                  type="text"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoFocus
                  spellCheck={false}
                  className="rounded-[4px] bg-[#F7F7F7] border-1 border-[#707070]"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute text-red-500 bottom-[-18px] right-0 block text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="relative mb-2">
              <FormLabel htmlFor="password" className="text-foreground mt-5">
                Senha
              </FormLabel>
              <FormControl>
                <div
                  className={`bg-[#F7F7F7] flex h-10 w-full items-center 
                  justify-between gap-2 rounded-[4px] border-1 border-[#707070] 
                  px-3 py-2 
                  text-center focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 
                  ${
                    fieldState.error
                      ? `focus-within:ring-rose-600`
                      : `focus-within:ring-ring`
                  }
                `}
                >
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-full w-full rounded-[4px] border-none bg-transparent p-0 focus-visible:ring-transparent"
                    name={field.name}
                    onChange={(value) => value && field.onChange(value)}
                    ref={field.ref}
                    autoComplete="current-password"
                    spellCheck={false}
                    required
                  />
                  <span className="cursor-pointer leading-[0]">
                    <button
                      onClick={handleTogglePasswordVisibility}
                      type="button"
                      className="focus-visible:outline-primary cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="text-gray-500" strokeWidth={1} />
                      ) : (
                        <Eye className="text-gray-500" strokeWidth={1} />
                      )}
                    </button>
                  </span>
                </div>
              </FormControl>
              <FormMessage className="absolute text-red-500 bottom-[-18px] right-0 block text-xs" />
            </FormItem>
          )}
        />
        {shouldShowSelect && (
          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem className="relative mt-5">
                <FormLabel htmlFor="roles" className="text-foreground block">
                  Perfil
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange([value])}
                    value={field.value?.[0] || ""}
                  >
                    <SelectTrigger
                      className="w-full rounded-[4px] border-1 border-[#707070] bg-[#F7F7F7]"
                      id="roles"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="absolute z-50 bg-white shadow-lg">
                      {roles
                        .filter(
                          (role) =>
                            role === ROLE.admin || role === ROLE.librarian
                        )
                        .map((role) => (
                          <SelectItem
                            key={role}
                            value={role}
                            className="cursor-pointer"
                          >
                            {role === ROLE.admin
                              ? "Adminstrador"
                              : "Bibliotecário"}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="absolute text-red-500 bottom-[-18px] right-0 block text-xs" />
              </FormItem>
            )}
          />
        )}
        <Button
          className="w-full h-10 cursor-pointer bg-[#007A7C] text-white my-8 rounded-[4px]"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <Loader className="h-4 w-4" />
          ) : (
            "Entrar"
          )}
        </Button>
        <div className="mb-2 text-center text-sm">
          Já tem uma conta? {""}
          <Link href="/login" className="text-[#007A7C]">
            Clique aqui
          </Link>
        </div>
      </form>
    </Form>
  );
};
