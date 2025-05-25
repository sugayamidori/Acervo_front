import { z } from "zod";

import { registerAdminSchema } from "./schemas";

const typesRegister = registerAdminSchema();
export type registerFormInputsProps = z.infer<typeof typesRegister>;

export interface RegisterComponentProps {
  userType?: string;
}
