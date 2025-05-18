import { z } from "zod";

export const loginAdminSchema = () => {
  const schema = z.object({
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
  });
  return schema;
};
