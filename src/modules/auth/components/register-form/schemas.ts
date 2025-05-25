import { z } from "zod";
import { ROLE } from "@acervo/constants/roles";

export const registerAdminSchema = () => {
  const roles = Object.values(ROLE) as [string, ...string[]];
  const schema = z.object({
    username: z
      .string({
        required_error: "Insira seu nome completo",
      })
      .min(1, {
        message: "Mínimo de 1 caracteres",
      })
      .max(128, {
        message: "Máximo de 128 caracteres",
      })
      .trim(),
    email: z
      .string({
        required_error: "Insira seu email",
      })
      .email("E-mail inválido")
      .min(1, {
        message: "Mínimo de 1 caracteres",
      })
      .max(128, {
        message: "Máximo de 128 caracteres",
      })
      .trim(),
    password: z
      .string({
        required_error: "Insira sua senha",
      })
      .min(6, {
        message: "Mínimo de 6 caracteres",
      })
      .max(12, {
        message: "Máximo de 12 caracteres",
      })
      .trim(),
    roles: z.array(z.enum(roles)).optional(),
  });
  return schema;
};
