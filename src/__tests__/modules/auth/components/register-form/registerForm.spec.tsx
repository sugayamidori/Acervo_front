import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "@acervo/modules/auth/components/register-form";
import { authRegisterAdmin, authRegisterMember } from "@acervo/service/auth";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

import React from "react";

jest.mock("@acervo/service/auth", () => ({
  authRegisterAdmin: jest.fn(),
  authRegisterMember: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  usePathname: jest.fn(),
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
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockedNextLink.displayName = "MockNextLink";
  return { __esModule: true, default: MockedNextLink };
});

jest.mock("lucide-react", () => ({
  ...jest.requireActual("lucide-react"),
  Eye: () => <svg data-testid="eye-icon" />,
  EyeOff: () => <svg data-testid="eye-off-icon" />,
  Loader2: ({ className }: { className?: string }) => (
    <svg data-testid="lucide-loader2-mock" className={className}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
}));

const mockedAuthRegisterAdmin = authRegisterAdmin as jest.Mock;
const mockedAuthRegisterMember = authRegisterMember as jest.Mock;
const mockedToastSuccess = toast.success as jest.Mock;
const mockedToastError = toast.error as jest.Mock;
const mockedUsePathname = usePathname as jest.Mock;

describe("RegisterForm Component", () => {
  const user = userEvent.setup();

  const fillCommonFields = async () => {
    await user.type(screen.getByLabelText(/nome/i), "Test User");
    await user.type(screen.getByLabelText(/e-mail/i), "test@example.com");
    await user.type(screen.getByLabelText(/senha/i), "password123");
  };

  const selectRoleValue = async (
    roleText: "Adminstrador" | "Bibliotecário"
  ) => {
    const combobox = screen.getByRole("combobox");

    await act(async () => {
      fireEvent.mouseDown(combobox);
      const roleOption = await screen.findByText(roleText);
      await user.click(roleOption);

      await Promise.resolve();
    });
  };

  beforeEach(() => {
    mockedAuthRegisterAdmin.mockClear();
    mockedAuthRegisterMember.mockClear();
    mockedToastSuccess.mockClear();
    mockedToastError.mockClear();
    mockRouterPush.mockClear();
    mockedUsePathname.mockClear();
  });

  test("should render common fields correctly", () => {
    mockedUsePathname.mockReturnValue("/register/member");
    render(<RegisterForm />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /clique aqui/i })).toHaveAttribute(
      "href",
      "/login"
    );
  });

  test("should NOT render role select for member registration path", () => {
    mockedUsePathname.mockReturnValue("/register");
    render(<RegisterForm />);
    expect(screen.queryByLabelText(/perfil/i)).not.toBeInTheDocument();
  });

  test("should render role select for admin path and list options", async () => {
    mockedUsePathname.mockReturnValue("/admin/register");
    render(<RegisterForm />);
    expect(screen.getByLabelText(/perfil/i)).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("combobox"));
    expect(await screen.findByText("Adminstrador")).toBeInTheDocument();
    expect(await screen.findByText("Bibliotecário")).toBeInTheDocument();
  });

  test("should call authRegisterMember on submit for member path and show success", async () => {
    mockedUsePathname.mockReturnValue("/register");
    mockedAuthRegisterMember.mockResolvedValue(true);
    render(<RegisterForm />);
    await fillCommonFields();
    await user.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() =>
      expect(mockedAuthRegisterMember).toHaveBeenCalledWith(
        expect.objectContaining({ username: "Test User" })
      )
    );
    await waitFor(() =>
      expect(mockedToastSuccess).toHaveBeenCalledWith(
        "Usuário cadastrado com sucesso!",
        expect.any(Object)
      )
    );
    await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith("/login"));
  });

  test("should show error toast if authRegisterMember fails", async () => {
    mockedUsePathname.mockReturnValue("/register");
    mockedAuthRegisterMember.mockResolvedValue(false);
    render(<RegisterForm />);
    await fillCommonFields();
    await user.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() => expect(mockedAuthRegisterMember).toHaveBeenCalled());
    await waitFor(() =>
      expect(mockedToastError).toHaveBeenCalledWith(
        "Não foi possível cadastrar esse usuário",
        expect.any(Object)
      )
    );
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  test("should show error toast if authRegisterAdmin fails", async () => {
    mockedUsePathname.mockReturnValue("/admin/register");
    mockedAuthRegisterAdmin.mockResolvedValue(false);
    render(<RegisterForm />);
    await fillCommonFields();
    await selectRoleValue("Adminstrador");
    await user.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() => expect(mockedAuthRegisterAdmin).toHaveBeenCalled());
    await waitFor(() => expect(mockedToastError).toHaveBeenCalled());
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  test("should show error toast and not call specific auth function for librarian path (as per current logic)", async () => {
    mockedUsePathname.mockReturnValue("/librarian/register");
    render(<RegisterForm />);
    await fillCommonFields();
    await selectRoleValue("Bibliotecário");
    await user.click(screen.getByRole("button", { name: /entrar/i }));
    await waitFor(() => {
      expect(mockedAuthRegisterAdmin).not.toHaveBeenCalled();
      expect(mockedAuthRegisterMember).not.toHaveBeenCalled();
    });
    await waitFor(() =>
      expect(mockedToastError).toHaveBeenCalledWith(
        "Não foi possível cadastrar esse usuário",
        expect.any(Object)
      )
    );
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  test("should show loader when form is submitting", async () => {
    mockedUsePathname.mockReturnValue("/register");
    mockedAuthRegisterMember.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(true), 100))
    );
    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", { name: /entrar/i });
    await fillCommonFields();
    await user.click(submitButton);
    expect(submitButton).toBeDisabled();
    const loaderWrapper = screen.getByTestId("loader-component");
    expect(submitButton).toContainElement(loaderWrapper);
    const svgMock = screen.getByTestId("lucide-loader2-mock");
    expect(loaderWrapper).toContainElement(svgMock);
    expect(svgMock).toHaveClass("h-4", "w-4");
    await waitFor(() => expect(submitButton).not.toBeDisabled());
    await waitFor(() =>
      expect(screen.queryByTestId("loader-component")).not.toBeInTheDocument()
    );
  });
});
