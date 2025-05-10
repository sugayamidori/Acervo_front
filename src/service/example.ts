import { fetchAPI } from ".";
import { Example, FormsRequestPayload } from "@acervo/types/example";
import { ExampleRequest } from "@acervo/constants/example";

export const getListExample = async (): Promise<Example[]> => {
  const response = await fetchAPI({
    url: "example",
    options: {
      method: "GET",
    },
  });

  const data: Example[] = await response.json();

  return data;
};

export const getListExampleIds = async (formData: {
  idExample: string;
}): Promise<Example[]> => {
  const response = await fetchAPI({
    url: `example/${formData.idExample}`,
    options: {
      method: "GET",
    },
  });

  const data: Example[] = await response.json();

  return data;
};

export const updateExample = async (formData: FormsRequestPayload) => {
  const response = await fetchAPI({
    url: "example",
    options: {
      method: "PUT",
      body: JSON.stringify(ExampleRequest(formData)),
    },
  });

  if (!response.ok) return false;
  return response.status === 200;
};

export const insertExample = async (formData: FormsRequestPayload) => {
  const response = await fetchAPI({
    url: "example",
    options: {
      method: "POST",
      body: JSON.stringify(ExampleRequest(formData)),
    },
  });

  if (!response.ok) return false;
  return response.status === 200;
};
