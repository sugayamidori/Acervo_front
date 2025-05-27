import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SecondaryBanner } from '@acervo/modules/home-member/components/SecondaryBanner';
import { Livro, StatusLivro } from '@acervo/types/livro';
import { getLivros } from '@acervo/service/livros';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock('@acervo/service/livros');
const mockGetLivros = getLivros as jest.MockedFunction<typeof getLivros>;

const sampleLivroMisterio: Livro = {
  id: '123',
  titulo: 'O Enigma da Mansão Abandonada',
  autor: 'Autor Misterioso',
  genero: 'MISTERIO',
  isbn: '978-3-16-148410-0',
  dataPublicacao: '2023-10-26',
  sumario: 'Um breve sumário do mistério...',
  status: StatusLivro.DISPONIVEL,
  imagem: 'https://exemplo.com/imagem_misterio.jpg',
};

const sampleLivroOutroGenero: Livro = {
  id: '456',
  titulo: 'Aventura nas Montanhas',
  autor: 'Aventureiro Anônimo',
  genero: 'AVENTURA',
  isbn: '978-1-23-456789-7',
  dataPublicacao: '2022-05-10',
  sumario: 'Uma aventura emocionante...',
  status: StatusLivro.DISPONIVEL,
  imagem: 'https://exemplo.com/imagem_aventura.jpg',
};

describe('SecondaryBanner', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockGetLivros.mockClear();
    mockRouterPush.mockClear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('não renderiza nada se getLivros retorna vazio ou sem livro de mistério', async () => {
    mockGetLivros.mockResolvedValueOnce([sampleLivroOutroGenero]);
    const { container } = render(<SecondaryBanner />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });

    mockGetLivros.mockResolvedValueOnce([]);
    const { container: container2 } = render(<SecondaryBanner />);
    await waitFor(() => {
      expect(container2.firstChild).toBeNull();
    });
  });

  test('renderiza o banner corretamente quando um livro de mistério é encontrado', async () => {
    mockGetLivros.mockResolvedValueOnce([sampleLivroOutroGenero, sampleLivroMisterio]);
    render(<SecondaryBanner />);

    await waitFor(() => {
      expect(screen.getByText('Livro em Destaque')).toBeInTheDocument();
    });

    expect(screen.getByText(sampleLivroMisterio.titulo)).toBeInTheDocument();
    const imgElement = screen.getByAltText(sampleLivroMisterio.titulo) as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(sampleLivroMisterio.imagem);
    expect(screen.getByRole('button', { name: 'Clique Aqui' })).toBeInTheDocument();
    expect(screen.getByAltText('Decoração')).toBeInTheDocument();
  });

  test('renderiza placeholder se livro de destaque não tiver imagem', async () => {
    const livroMisterioSemImagem = { ...sampleLivroMisterio, imagem: '' };
    mockGetLivros.mockResolvedValueOnce([livroMisterioSemImagem]);
    render(<SecondaryBanner />);

    await waitFor(() => {
      expect(screen.getByText('Livro em Destaque')).toBeInTheDocument();
    });
    expect(screen.getByText(livroMisterioSemImagem.titulo)).toBeInTheDocument();
    expect(screen.getByText('Imagem não disponível')).toBeInTheDocument();
  });

  test('chama router.push com o ID correto ao clicar no botão', async () => {
    mockGetLivros.mockResolvedValueOnce([sampleLivroMisterio]);
    render(<SecondaryBanner />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText('Livro em Destaque')).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: 'Clique Aqui' });
    await user.click(button);

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith(`/book/${sampleLivroMisterio.id}`);
  });

  test('lida com erro ao buscar livros e não renderiza o banner', async () => {
    mockGetLivros.mockRejectedValueOnce(new Error('Falha na API'));
    const { container } = render(<SecondaryBanner />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Erro ao exibir o livro:", expect.any(Error));
    });
    expect(container.firstChild).toBeNull();
  });

  test('renderiza o primeiro livro de mistério se houver múltiplos', async () => {
    const outroLivroMisterio: Livro = { ...sampleLivroMisterio, id: '789', titulo: 'Outro Mistério Incrível' };
    mockGetLivros.mockResolvedValueOnce([sampleLivroOutroGenero, sampleLivroMisterio, outroLivroMisterio]);
    render(<SecondaryBanner />);

    await waitFor(() => {
      expect(screen.getByText('Livro em Destaque')).toBeInTheDocument();
    });
    expect(screen.getByText(sampleLivroMisterio.titulo)).toBeInTheDocument();
    expect(screen.queryByText(outroLivroMisterio.titulo)).not.toBeInTheDocument();
  });
});