import "@testing-library/jest-dom";

import type { ImageProps } from "next/image";
import type { LinkProps } from "next/link";

import { render, screen } from "@testing-library/react";

import { CustomInputProps, LucideIconProps } from "@acervo/types/tests";
import { Header } from "@acervo/components/header/index";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: (props: LinkProps) => {
    return <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  },
}));

jest.mock("@acervo/components/ui/input", () => ({
  Input: (props: CustomInputProps) => (
    <input data-testid="mock-input" {...props} />
  ),
}));

jest.mock("lucide-react", () => ({
  Search: (props: LucideIconProps) => (
    <svg data-testid="search-icon" {...props} />
  ),
}));

jest.mock("@acervo/constants/index", () => ({
  Logo: {
    title: "Acervo Logo",
    logo: "/images/logo.svg",
  },
}));

describe("Header", () => {
  test("should render correctly", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("should render the logo with correct attributes", () => {
    render(<Header />);

    const logoImage = screen.getByAltText("Acervo Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/images/logo.svg");
    expect(logoImage).toHaveAttribute("width", "180");
    expect(logoImage).toHaveAttribute("height", "30");

    const logoLink = screen.getByRole("link", { name: "Acervo Logo" });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  test("should render the search input with correct placeholder", () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText("Busque por um livro");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  test("should render the search icon", () => {
    render(<Header />);

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  test("should render navigation links", () => {
    render(<Header />);

    const loginLink = screen.getByRole("link", { name: /fazer login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "#");

    const signupLink = screen.getByRole("link", { name: /cadastre-se/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "#");
  });
});
