import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookPage from '@acervo/modules/book-page/pages/index';

import { getLivroPorId } from '@acervo/service/livros';
import { BookDetails } from '@acervo/modules/book-page/components/BookDetails';
import { Livro, StatusLivro } from '@acervo/types/livro';

jest.mock('@acervo/service/livros', () => ({
  getLivroPorId: jest.fn(),
}));

jest.mock('@acervo/modules/book-page/components/BookDetails', () => ({
  BookDetails: jest.fn(({ book }: { book: Livro }) => (
    <div data-testid="book-details-mock">
      <h1>{book.titulo}</h1>
      {book.autor && <p>{book.autor}</p>}
    </div>
  )),
}));

const mockedGetLivroPorId = getLivroPorId as jest.MockedFunction<typeof getLivroPorId>;
const MockedBookDetails = BookDetails as jest.MockedFunction<typeof BookDetails>;

describe('BookPage Component', () => {
  const mockBookData: Livro = {
    id: '1',
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    isbn: '978-3-16-148410-0',
    dataPublicacao: '1954-07-29',
    genero: 'Fantasia Épica',
    sumario: 'Uma jornada perigosa para destruir um anel de poder.',
    status: StatusLivro.DISPONIVEL,
    imagem: 'path/to/lotr-image.jpg',
  };

  const mockParamsSuccess = { params: { id: '1' } };
  const mockParamsError = { params: { id: 'error-id' } };
  const mockParamsSpecificId = { params: { id: 'test-id-456' } };

  beforeEach(() => {
    mockedGetLivroPorId.mockClear();
    MockedBookDetails.mockClear();
  });

  it('📚 deve buscar o livro e renderizar BookDetails em caso de sucesso', async () => {
    mockedGetLivroPorId.mockResolvedValue(mockBookData);

    const PageComponent = await BookPage(mockParamsSuccess);
    render(PageComponent);

    expect(mockedGetLivroPorId).toHaveBeenCalledWith('1');
    expect(mockedGetLivroPorId).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByTestId('book-details-mock')).toBeInTheDocument();
      expect(screen.getByText(mockBookData.titulo)).toBeInTheDocument();
      if (mockBookData.autor) {
        expect(screen.getByText(mockBookData.autor)).toBeInTheDocument();
      }
    });

    expect(MockedBookDetails).toHaveBeenCalledWith(
      expect.objectContaining({ book: mockBookData }),
      undefined
    );
    expect(screen.queryByText('Livro não encontrado.')).not.toBeInTheDocument();
  });

  it('❌ deve exibir mensagem de erro se getLivroPorId falhar', async () => {
    mockedGetLivroPorId.mockRejectedValue(new Error('Falha ao buscar livro'));

    const PageComponentOnError = await BookPage(mockParamsError);
    render(PageComponentOnError);

    expect(mockedGetLivroPorId).toHaveBeenCalledWith('error-id');
    expect(mockedGetLivroPorId).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('Livro não encontrado.')).toBeInTheDocument();

    expect(screen.queryByTestId('book-details-mock')).not.toBeInTheDocument();
    expect(MockedBookDetails).not.toHaveBeenCalled();
  });

  it('🔍 deve chamar getLivroPorId com o ID correto dos parâmetros da rota', async () => {
    const specificMockBookData = { ...mockBookData, id: 'test-id-456', titulo: "Outro Livro Incrível" };
    mockedGetLivroPorId.mockResolvedValue(specificMockBookData);

    const PageComponentSpecific = await BookPage(mockParamsSpecificId);
    render(PageComponentSpecific);

    expect(mockedGetLivroPorId).toHaveBeenCalledWith('test-id-456');

    await waitFor(() => {
        expect(screen.getByTestId('book-details-mock')).toBeInTheDocument();
        expect(screen.getByText(specificMockBookData.titulo)).toBeInTheDocument();
    });
  });
});