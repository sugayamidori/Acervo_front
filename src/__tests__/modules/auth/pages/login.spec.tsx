import type { ImageProps } from "next/image";
import { render, screen } from "@testing-library/react";

import Login from "@acervo/modules/auth/pages/login/index";

jest.mock("@acervo/modules/auth/components/login-form", () => ({
  LoginForm: () => <div data-testid="login-form-mock">LoginFormMock</div>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return <img {...props} />;
  },
}));

jest.mock("@acervo/constants/index", () => ({
  Logo: {
    logo: "/path/to/mock-logo.png",
    title: "Mock Acervo Digital",
  },
}));

describe("Login Page", () => {
  test("should render the logo image correctly", () => {
    render(<Login />);
    const image = screen.getByRole("img", { name: /mock acervo digital/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/path/to/mock-logo.png");
    expect(image).toHaveAttribute("width", "282");
    expect(image).toHaveAttribute("height", "45");
  });

  test("should render the main heading", () => {
    render(<Login />);
    expect(
      screen.getByRole("heading", { name: /acesse sua conta/i, level: 1 })
    ).toBeInTheDocument();
  });

  test("should render the LoginForm component", () => {
    render(<Login />);
    expect(screen.getByTestId("login-form-mock")).toBeInTheDocument();
  });
});
