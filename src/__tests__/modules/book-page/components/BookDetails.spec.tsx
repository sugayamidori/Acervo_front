import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BookDetails } from "@acervo/modules/book-page/components/BookDetails";
import { Livro, StatusLivro } from "@acervo/types/livro";
import { format, addDays } from "date-fns";
import { LoanDialog } from "@acervo/modules/book-page/components/LoanDialog";
import { getBase64ImageSrc } from "@acervo/utils/formatter";

jest.mock("@acervo/utils/formatter", () => ({
  getBase64ImageSrc: jest.fn(
    (imageString: string, imageType: string) => `data:${imageType};base64,${imageString}`
  ),
}));

jest.mock("@acervo/modules/book-page/components/LoanDialog", () => ({
  LoanDialog: jest.fn(({ isOpen, onOpenChange, formattedReturnDate }) =>
    isOpen ? (
      <div data-testid="loan-dialog">
        <span>Mocked LoanDialog</span>
        <button onClick={() => onOpenChange(false)}>Close Mock Dialog</button>
        <span>Return Date: {formattedReturnDate}</span>
      </div>
    ) : null
  ),
}));

const MockedLoanDialog = LoanDialog as jest.Mock;
const MockedGetBase64ImageSrc = getBase64ImageSrc as jest.Mock;

const mockBookDisponivel: Livro = {
  id: "1",
  isbn: "978-3-16-148410-0",
  titulo: "O Sol é para Todos",
  dataPublicacao: "11/07/1960",
  genero: "Ficção Clássica",
  autor: "Harper Lee",
  sumario: "Um advogado no sul dos Estados Unidos defende um homem negro...",
  status: StatusLivro.DISPONIVEL,
  imagem: "http://example.com/sol.jpg",
};

const mockBookIndisponivel: Livro = {
  id: "2",
  isbn: "978-0-7432-7356-5",
  titulo: "O Grande Gatsby",
  dataPublicacao: "10/04/1925",
  genero: "Romance",
  autor: "F. Scott Fitzgerald",
  sumario: "A história de Jay Gatsby e seu amor por Daisy Buchanan.",
  status: StatusLivro.INDISPONIVEL,
  imagem: "http://example.com/gatsby.jpg",
};

const mockBookSemSumario: Livro = {
  id: "3",
  isbn: "978-0-452-28423-4",
  titulo: "1984",
  dataPublicacao: "08/06/1949",
  genero: "Distopia",
  autor: "George Orwell",
  sumario: null,
  status: StatusLivro.DISPONIVEL,
  imagem: "http://example.com/1984.jpg",
};

const mockBookSumarioVazioString: Livro = {
  id: "4",
  isbn: "978-1-9848-0193-9",
  titulo: "Circe",
  dataPublicacao: "10/04/2018",
  genero: "Fantasia Histórica",
  autor: "Madeline Miller",
  sumario: "   ",
  status: StatusLivro.DISPONIVEL,
  imagem: "http://example.com/circe.jpg",
};

const MOCK_TODAY = new Date(2024, 4, 24); // Maio é mês 4 (0-indexed)

describe("BookDetails Component", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_TODAY);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    consoleErrorSpy.mockRestore();
  });

  it("📚 should render all book details correctly for an available book", () => {
    render(<BookDetails book={mockBookDisponivel} />);

    expect(screen.getByRole("heading", { name: mockBookDisponivel.titulo })).toBeInTheDocument();
    expect(screen.getByText(mockBookDisponivel.autor!)).toBeInTheDocument();
    expect(screen.getByText(mockBookDisponivel.sumario!)).toBeInTheDocument();
    expect(screen.getByText(mockBookDisponivel.dataPublicacao)).toBeInTheDocument();
    expect(screen.getByText(mockBookDisponivel.genero)).toBeInTheDocument();
    expect(screen.getByText(mockBookDisponivel.isbn)).toBeInTheDocument();

    const image = screen.getByRole("img", { name: mockBookDisponivel.titulo });
    expect(MockedGetBase64ImageSrc).toHaveBeenCalledWith(mockBookDisponivel.imagem, "image/png");
    expect(image).toHaveAttribute("src", `data:image/png;base64,${mockBookDisponivel.imagem}`);

    const statusElement = screen.getByText(/Disponivel para empréstimo/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("bg-[#CAFFDF]");
    expect(statusElement).not.toHaveClass("bg-red-500");
  });

  it("📖 should render 'Sumário não disponível.' when summary is null", () => {
    render(<BookDetails book={mockBookSemSumario} />);
    expect(screen.getByText("Sumário não disponível.")).toBeInTheDocument();
  });

  it("📄 should render 'Sumário não disponível.' when summary is an empty string after trim", () => {
    render(<BookDetails book={mockBookSumarioVazioString} />);
    expect(screen.getByText("Sumário não disponível.")).toBeInTheDocument();
  });

  it(" unavailability status and style for an 'INDISPONIVEL' book", () => {
    render(<BookDetails book={mockBookIndisponivel} />);

    const statusElement = screen.getByText(/Indisponivel para empréstimo/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass("bg-red-500", "text-white");
    expect(statusElement).not.toHaveClass("bg-[#CAFFDF]");
  });

  it("🗓️ should open LoanDialog with correct props when 'Adicionar ao empréstimo' button is clicked", () => {
    render(<BookDetails book={mockBookDisponivel} />);

    const loanButton = screen.getByRole("button", { name: /adicionar ao empréstimo/i });
    expect(screen.queryByTestId("loan-dialog")).not.toBeInTheDocument();

    fireEvent.click(loanButton);

    expect(screen.getByTestId("loan-dialog")).toBeInTheDocument();
    const expectedReturnDate = format(addDays(MOCK_TODAY, 7), "dd/MM/yyyy");
    expect(MockedLoanDialog).toHaveBeenCalledTimes(2);
    expect(MockedLoanDialog).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: true,
        formattedReturnDate: expectedReturnDate,
        onOpenChange: expect.any(Function),
      }),
      undefined
    );
  });

  it("🔄 should close LoanDialog when its internal close mechanism is triggered", () => {
    render(<BookDetails book={mockBookDisponivel} />);

    const loanButton = screen.getByRole("button", { name: /adicionar ao empréstimo/i });
    fireEvent.click(loanButton);
    expect(screen.getByTestId("loan-dialog")).toBeInTheDocument();

    const closeMockDialogButton = screen.getByRole("button", { name: "Close Mock Dialog" });
    fireEvent.click(closeMockDialogButton);

    expect(screen.queryByTestId("loan-dialog")).not.toBeInTheDocument();
    expect(MockedLoanDialog).toHaveBeenCalledTimes(3);
    expect(MockedLoanDialog).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isOpen: false,
        onOpenChange: expect.any(Function),
        formattedReturnDate: format(addDays(MOCK_TODAY, 7), "dd/MM/yyyy"),
      }),
      undefined
    );
  });

  it("🖼️ should render placeholder if book image is an empty string", () => {
    const bookWithEmptyImage = { ...mockBookDisponivel, imagem: "" };
    render(<BookDetails book={bookWithEmptyImage} />);
    expect(screen.getByText("Imagem não disponível")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: bookWithEmptyImage.titulo })).not.toBeInTheDocument();
  });

  it("🖼️ should render placeholder if book image is null", () => {
    const bookWithNullImage = { ...mockBookDisponivel, imagem: null as any };
    render(<BookDetails book={bookWithNullImage} />);
    expect(screen.getByText("Imagem não disponível")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: bookWithNullImage.titulo })).not.toBeInTheDocument();
  });
});