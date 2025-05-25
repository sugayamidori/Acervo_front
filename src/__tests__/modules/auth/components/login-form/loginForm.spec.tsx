import { toast } from "sonner";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import { LoginForm } from "@acervo/modules/auth/components/login-form";
import { authLogin } from "@acervo/service/auth";

jest.mock("@acervo/service/auth", () => ({
  authLogin: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("next/link", () => {
  const MockedNextLink = ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) => {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };

  MockedNextLink.displayName = "MockNextLink";

  return {
    __esModule: true,
    default: MockedNextLink,
  };
});

jest.mock("lucide-react", () => ({
  ...jest.requireActual("lucide-react"),
  Eye: () => <svg data-testid="eye-icon" />,
  EyeOff: () => <svg data-testid="eye-off-icon" />,
}));

const mockedAuthLogin = authLogin as jest.Mock;
const mockedToastSuccess = toast.success as jest.Mock;
const mockedToastError = toast.error as jest.Mock;

describe("LoginForm Component", () => {
  beforeEach(() => {
    mockedAuthLogin.mockClear();
    mockedToastSuccess.mockClear();
    mockedToastError.mockClear();
  });

  const setup = () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    return { user };
  };

  test("should render email and password inputs and submit button", () => {
    setup();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  test("should allow typing into email and password fields", async () => {
    const { user } = setup();
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("should toggle password visibility", async () => {
    const { user } = setup();
    const passwordInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    const toggleButton = screen.getByTestId("eye-icon").closest("button");

    expect(passwordInput.type).toBe("password");
    if (toggleButton) await user.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    expect(screen.getByTestId("eye-off-icon")).toBeInTheDocument();
    if (toggleButton) await user.click(toggleButton);
    expect(passwordInput.type).toBe("password");
    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
  });

  test("should call authLogin and toast.success on successful submission", async () => {
    const { user } = setup();
    mockedAuthLogin.mockResolvedValue(true);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedAuthLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
    await waitFor(() => {
      expect(mockedToastSuccess).toHaveBeenCalledWith(
        "Seja bem-vindo!",
        expect.any(Object)
      );
    });
  });

  test("should call authLogin and toast.error on failed submission", async () => {
    const { user } = setup();
    mockedAuthLogin.mockResolvedValue(false);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedAuthLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
    await waitFor(() => {
      expect(mockedToastError).toHaveBeenCalledWith(
        "Usuário ainda não cadastrado",
        expect.any(Object)
      );
    });
  });

  test("should display validation errors for invalid email", async () => {
    const { user } = setup();
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "invalidemail");
    await user.type(passwordInput, "validpassword123");
    await user.click(submitButton);

    const errorMessage = await screen.findByText("E-mail inválido");
    expect(errorMessage).toBeInTheDocument();

    await waitFor(() => {
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });

    expect(mockedAuthLogin).not.toHaveBeenCalled();
  });

  test("should display validation errors for short password", async () => {
    const { user } = setup();
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "valid@email.com");
    await user.type(passwordInput, "123");
    await user.click(submitButton);

    expect(
      await screen.findByText("Mínimo de 6 caracteres")
    ).toBeInTheDocument();
    expect(mockedAuthLogin).not.toHaveBeenCalled();
  });

  test("should show loader when form is submitting", async () => {
    const { user } = setup();
    mockedAuthLogin.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100))
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();

    const loaderWrapper = screen.getByTestId("loader-component");
    expect(submitButton).toContainElement(loaderWrapper);

    const svgElement = loaderWrapper.querySelector("svg");
    expect(svgElement).toBeInTheDocument();

    expect(svgElement).toHaveClass(
      "lucide",
      "lucide-loader-circle",
      "animate-spin",
      "h-4",
      "w-4"
    );

    await waitFor(() => expect(submitButton).not.toBeDisabled());
    await waitFor(() =>
      expect(screen.queryByTestId("loader-component")).not.toBeInTheDocument()
    );
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  test('should have a link to "/" with correct text', () => {
    setup();
    const link = screen.getByRole("link", { name: /clique aqui/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
