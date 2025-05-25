export enum StatusLivro {
  DISPONIVEL = "DISPONIVEL",
  INDISPONIVEL = "INDISPONIVEL"
}

export interface Livro {
  id: string;
  isbn: string;
  titulo: string;
  dataPublicacao: string;
  genero: string;
  autor: string | null;
  sumario: string | null;
  status: StatusLivro;
  imagem: string;
}
