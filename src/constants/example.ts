import { FormsRequestPayload } from "@acervo/types/example";

export function ExampleRequest({
  exeOne,
  exeTwo,
  exeThree,
}: FormsRequestPayload) {
  return {
    exeOne,
    exeTwo,
    exeThree,
  };
}
