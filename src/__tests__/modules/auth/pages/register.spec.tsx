import { render, screen } from "@testing-library/react";
import Register from "@acervo/modules/auth/pages/register";
import { ImageProps } from "next/image";

jest.mock("@acervo/modules/auth/components/register-form", () => ({
  RegisterForm: () => (
    <div data-testid="register-form-mock">RegisterFormMock</div>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return <img {...props} />;
  },
}));

jest.mock("@acervo/constants/index", () => ({
  Logo: {
    logo: "/mock-logo.png",
    title: "Mock Acervo Digital Title",
  },
}));

describe("Register Page", () => {
  test("should render the logo image correctly", () => {
    render(<Register />);
    const image = screen.getByRole("img", {
      name: /mock acervo digital title/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/mock-logo.png");
    expect(image).toHaveAttribute("width", "282");
    expect(image).toHaveAttribute("height", "45");
  });

  test("should render the main heading", () => {
    render(<Register />);
    expect(
      screen.getByRole("heading", { name: /crie sua conta/i, level: 1 })
    ).toBeInTheDocument();
  });

  test("should render the RegisterForm component", () => {
    render(<Register />);
    expect(screen.getByTestId("register-form-mock")).toBeInTheDocument();
  });
});
