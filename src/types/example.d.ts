export interface Example {
  id: string;
  exeOne: string;
  exeTwo: string;
  exeThree: string;
}

export interface FormsRequestPayload extends Example {
  exampleRequest: Example;
}
