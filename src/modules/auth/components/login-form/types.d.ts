import { z } from "zod";

import { loginAdminSchema } from "./schemas";

const typesLogin = loginAdminSchema();
export type loginFormInputsProps = z.infer<typeof typesLogin>;
