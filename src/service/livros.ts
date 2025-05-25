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


export const getLivroPorId = async (id: string): Promise<Livro> => {
  const response = await fetchAPI({
    url: `livros/${id}`,
    options: { method: "GET" },
  });

  if (!response.ok) throw new Error("Erro ao buscar livro por ID");
  const data: Livro = await response.json();
  return data;
};