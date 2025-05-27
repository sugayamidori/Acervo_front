import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginaDeBusca from '@acervo/app/search/page';
import { getLivros } from '@acervo/service/livros';
import { Livro, StatusLivro } from '@acervo/types/livro';

const mockGetQueryParam = jest.fn();
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: () => ({
    get: mockGetQueryParam,
  }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: jest.fn(() => '/search'),
}));

jest.mock('@acervo/service/livros');
const mockGetLivros = getLivros as jest.MockedFunction<typeof getLivros>;

const generateSampleLivros = (count: number, query?: string): Livro[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `id-${i + 1}`,
    isbn: `isbn-${i + 1}`,
    titulo: query ? `${query} Livro ${i + 1}` : `Livro ${i + 1}`,
    dataPublicacao: '2023-01-01',
    genero: 'Ficção',
    autor: `Autor ${i + 1}`,
    sumario: `Sumário do livro ${i + 1}`,
    status: StatusLivro.DISPONIVEL,
    imagem: `img${i + 1}.jpg`,
  }));

describe('PaginaDeBusca (Search Page)', () => {
  beforeEach(() => {
    mockGetLivros.mockClear();
    mockGetQueryParam.mockClear();
  });

  test('deve buscar e exibir livros quando uma query é fornecida', async () => {
    const searchQuery = 'Aventura';
    mockGetQueryParam.mockReturnValue(searchQuery);
    mockGetLivros.mockResolvedValue(generateSampleLivros(3, searchQuery));

    render(<PaginaDeBusca />);

    await waitFor(() => {
      expect(screen.getByText(`Resultados da busca por: "${searchQuery}"`)).toBeInTheDocument();
    });

    expect(screen.getByText(`${searchQuery} Livro 1`)).toBeInTheDocument();
    expect(screen.getByText(`${searchQuery} Livro 2`)).toBeInTheDocument();
    expect(screen.getByText(`${searchQuery} Livro 3`)).toBeInTheDocument();
  });

  test('deve exibir mensagem de "Nenhum livro encontrado" se não houver query', async () => {
    mockGetQueryParam.mockReturnValue(null);
    mockGetLivros.mockResolvedValue([]);

    render(<PaginaDeBusca />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhum livro encontrado para ""\. Tente outros termos\./i)).toBeInTheDocument();
    });
  });

  test('renderiza o componente e o título corretamente com uma query', async () => {
    const searchQuery = 'Teste Query';
    mockGetQueryParam.mockReturnValue(searchQuery);
    mockGetLivros.mockResolvedValue(generateSampleLivros(1, searchQuery));

    render(<PaginaDeBusca />);

    await waitFor(() => {
      expect(screen.getByText(`Resultados da busca por: "${searchQuery}"`)).toBeInTheDocument();
    });
    expect(screen.getByText(`${searchQuery} Livro 1`)).toBeInTheDocument();
  });

  test('lida corretamente com muitos livros (exige paginação, se implementada)', async () => {
    const searchQuery = 'Muitos Livros';
    mockGetQueryParam.mockReturnValue(searchQuery);
    const muitosLivros = generateSampleLivros(12, searchQuery);
    mockGetLivros.mockResolvedValue(muitosLivros);

    render(<PaginaDeBusca />);

    await waitFor(() => {
      expect(screen.getByText(`${searchQuery} Livro 1`)).toBeInTheDocument();
      expect(screen.getByText(`${searchQuery} Livro 5`)).toBeInTheDocument();
      expect(screen.queryByText(`${searchQuery} Livro 6`)).not.toBeInTheDocument();
    });
  });

  test('lida com erro da API e exibe mensagem apropriada', async () => {
    const searchQuery = 'Erro';
    mockGetQueryParam.mockReturnValue(searchQuery);
    mockGetLivros.mockRejectedValue(new Error('API falhou'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<PaginaDeBusca />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhum livro encontrado para "Erro"\. Tente outros termos\./i)).toBeInTheDocument();
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith("Erro ao buscar livros:", expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});