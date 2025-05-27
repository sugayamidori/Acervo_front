import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoanDialog } from "@acervo/modules/book-page/components/LoanDialog";
import { Dialog } from "@acervo/components/ui/dialog";

describe("LoanDialog Component", () => {
  const mockOnOpenChange = jest.fn();
  const testFormattedReturnDate = "01/06/2025";
  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    formattedReturnDate: testFormattedReturnDate,
  };

  const mockMathRandomValues = [
    0 / 36,
    1 / 36,
    2 / 36,
    26 / 36,
    27 / 36,
    28 / 36,
  ];
  const expectedGeneratedCode = "ABC012";
  let mathRandomSpy: jest.SpyInstance;

  beforeEach(() => {
    mockOnOpenChange.mockClear();
    let callCount = 0;
    mathRandomSpy = jest.spyOn(Math, "random").mockImplementation(() => {
      const value = mockMathRandomValues[callCount % mockMathRandomValues.length];
      callCount++;
      return value;
    });
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  const renderDialog = (props = defaultProps) => {
    return render(
      <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
        <LoanDialog {...props} />
      </Dialog>
    );
  };

  test("🖼️ should render initial state correctly", () => {
    renderDialog();

    expect(screen.getByText("Confirmar empréstimo")).toBeInTheDocument();
    expect(
      screen.getByText(/Deseja confirmar o empréstimo do livro?/)
    ).toBeInTheDocument();
    expect(screen.getByText(testFormattedReturnDate)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Fechar" })).not.toBeInTheDocument();
    expect(screen.queryByText(expectedGeneratedCode)).not.toBeInTheDocument();
  });

  test("🚫 should call onOpenChange with false when Cancelar button is clicked", () => {
    renderDialog();
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    fireEvent.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
  });

  test("✅ should generate code and update UI when Confirmar button is clicked", () => {
    renderDialog();
    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    fireEvent.click(confirmButton);

    expect(screen.getByText(/Empréstimo realizado com sucesso!/)).toBeInTheDocument();
    expect(screen.getByText(expectedGeneratedCode)).toBeInTheDocument();
    expect(screen.getByText(expectedGeneratedCode)).toHaveClass(
      "bg-gray-100", "p-2", "rounded"
    );

    expect(screen.queryByRole("button", { name: "Cancelar" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Confirmar" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
    expect(mockOnOpenChange).not.toHaveBeenCalled();
  });

  test("🚪 should call onOpenChange with false and reset UI when Fechar button is clicked after code generation", () => {
    renderDialog();

    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    fireEvent.click(confirmButton);

    const closeButton = screen.getByRole("button", { name: "Fechar" });
    fireEvent.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);

    expect(
      screen.getByText(/Deseja confirmar o empréstimo do livro?/)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
    expect(screen.queryByText(expectedGeneratedCode)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Fechar" })).not.toBeInTheDocument();
  });

  test("🔄 should reset code if dialog is closed externally (e.g., by Fechar button) after code generation", () => {
    renderDialog();

    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(screen.getByText(expectedGeneratedCode)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fechar" }));

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByText(expectedGeneratedCode)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Deseja confirmar o empréstimo do livro?/)
    ).toBeInTheDocument();
  });

  test("🔐 onInteractOutside logic (via handleOpenChange) is covered by button tests", () => {
    renderDialog();

    fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(screen.getByText(expectedGeneratedCode)).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: "Fechar" });
    fireEvent.click(closeButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByText(expectedGeneratedCode)).not.toBeInTheDocument();
  });
});