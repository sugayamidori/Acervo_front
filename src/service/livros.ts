import { fetchAPI } from ".";
import { Livro } from "@acervo/types/livro"; 

export const getLivros = async (): Promise<Livro[]> => {
  const response = await fetchAPI({
    url: "livros",
    options: {
      method: "GET",
    },
  });

  const data: Livro[] = await response.json();
  return data;
};
