import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CarouselBooks } from '@acervo/modules/home-member/components/CarouselBooks';
import { Livro, StatusLivro } from '@acervo/types/livro';
import { Card } from '@acervo/components/card/index';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@acervo/components/ui/carousel";

jest.mock('@acervo/components/card/index', () => ({
  Card: jest.fn(({ id, title, autor, image }) => (
    <div data-testid={`card-${id}`}>
      <h3 data-testid={`card-title-${id}`}>{title}</h3>
      <p data-testid={`card-autor-${id}`}>{autor}</p>
      <img data-testid={`card-image-${id}`} src={image} alt={title} />
    </div>
  )),
}));

jest.mock('@acervo/components/ui/carousel', () => ({
  Carousel: jest.fn(({ children, ...props }) => <div data-testid="carousel" {...props}>{children}</div>),
  CarouselContent: jest.fn(({ children, ...props }) => <div data-testid="carousel-content" {...props}>{children}</div>),
  CarouselItem: jest.fn(({ children, ...props }) => <div data-testid="carousel-item" {...props}>{children}</div>),
  CarouselNext: jest.fn(() => <button data-testid="carousel-next">Next</button>),
  CarouselPrevious: jest.fn(() => <button data-testid="carousel-previous">Previous</button>),
}));

const MockedCard = Card as jest.MockedFunction<typeof Card>;
const MockedCarouselItem = CarouselItem as jest.MockedFunction<typeof CarouselItem>;

describe('CarouselBooks Component', () => {
  const testTitle = "Livros Populares";
  const mockLivros: Livro[] = [
    {
      id: '1',
      titulo: 'A Guerra dos Tronos',
      autor: 'George R. R. Martin',
      imagem: 'got.jpg',
      isbn: '123',
      dataPublicacao: '1996',
      genero: 'Fantasia',
      status: StatusLivro.DISPONIVEL,
      sumario: 'Livro 1 da saga.',
    },
    {
      id: '2',
      titulo: 'O Hobbit',
      autor: null,
      imagem: 'hobbit.jpg',
      isbn: '456',
      dataPublicacao: '1937',
      genero: 'Fantasia',
      status: StatusLivro.DISPONIVEL,
      sumario: 'Aventura de Bilbo.',
    },
    {
      id: '3',
      titulo: 'Duna',
      autor: 'Frank Herbert',
      imagem: 'duna.jpg',
      isbn: '789',
      dataPublicacao: '1965',
      genero: 'Ficção Científica',
      status: StatusLivro.DISPONIVEL,
      sumario: 'Planeta deserto Arrakis.',
    },
  ];

  beforeEach(() => {
    MockedCard.mockClear();
    MockedCarouselItem.mockClear();
  });

  it('deve renderizar o título corretamente', () => {
    render(<CarouselBooks title={testTitle} livros={[]} />);
    expect(screen.getByRole('heading', { name: testTitle })).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toHaveClass('text-[20px] font-bold mb-6');
  });

  it('deve renderizar a estrutura básica do carrossel', () => {
    render(<CarouselBooks title={testTitle} livros={[]} />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-content')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-previous')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
  });

  it('deve renderizar um Card para cada livro fornecido', () => {
    render(<CarouselBooks title={testTitle} livros={mockLivros} />);
    expect(MockedCarouselItem).toHaveBeenCalledTimes(mockLivros.length);
    expect(MockedCard).toHaveBeenCalledTimes(mockLivros.length);
    mockLivros.forEach(livro => {
      expect(screen.getByTestId(`card-${livro.id}`)).toBeInTheDocument();
    });
  });

  it('deve passar os props corretos para cada Card, incluindo o fallback de autor', () => {
    render(<CarouselBooks title={testTitle} livros={mockLivros} />);

    expect(MockedCard).toHaveBeenCalledTimes(mockLivros.length);

    expect(MockedCard).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockLivros[0].id,
        image: mockLivros[0].imagem,
        title: mockLivros[0].titulo,
        autor: mockLivros[0].autor,
      }),
      undefined
    );

    expect(MockedCard).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockLivros[1].id,
        image: mockLivros[1].imagem,
        title: mockLivros[1].titulo,
        autor: "o caba vai endoidar é?",
      }),
      undefined
    );

    expect(MockedCard).toHaveBeenCalledWith(
      expect.objectContaining({
        id: mockLivros[2].id,
        image: mockLivros[2].imagem,
        title: mockLivros[2].titulo,
        autor: mockLivros[2].autor,
      }),
      undefined
    );
  });

  it('deve renderizar zero Cards se a lista de livros estiver vazia', () => {
    render(<CarouselBooks title={testTitle} livros={[]} />);
    expect(MockedCarouselItem).toHaveBeenCalledTimes(0);
    expect(MockedCard).toHaveBeenCalledTimes(0);
    expect(screen.queryByTestId(/card-/)).not.toBeInTheDocument();
  });

  it('deve passar className e renderizar children para cada CarouselItem', () => {
    render(<CarouselBooks title={testTitle} livros={mockLivros} />);

    expect(MockedCarouselItem).toHaveBeenCalledTimes(mockLivros.length);

    mockLivros.forEach((livro, index) => {
      expect(MockedCarouselItem).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({
          className: "basis-3/4 md:basis-1/3 lg:basis-1/4",
          children: expect.anything(),
        }),
        undefined
      );
    });
  });
});