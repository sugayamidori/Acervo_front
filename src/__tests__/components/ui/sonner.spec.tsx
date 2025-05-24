import { useTheme } from "next-themes";
import { Toaster as SonnerToasterMock } from "sonner";

import { render, screen } from "@testing-library/react";
import { Toaster } from "@acervo/components/ui/sonner";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

jest.mock("sonner", () => ({
  Toaster: jest.fn((propsReceivedBySonner) => {
    const { theme, className, style } = propsReceivedBySonner;
    return (
      <div
        data-testid="sonner-toaster"
        data-theme={theme}
        className={className}
        style={style}
      />
    );
  }),
}));
describe("Toaster Component", () => {
  const mockUseTheme = useTheme as jest.Mock;

  const mockedSonnerImplementation = SonnerToasterMock as unknown as jest.Mock;

  beforeEach(() => {
    mockUseTheme.mockClear();
    mockedSonnerImplementation.mockClear();
  });

  test('should render Sonner with the "system" theme by default', () => {
    mockUseTheme.mockReturnValue({ theme: undefined });
    render(<Toaster />);

    const sonnerElement = screen.getByTestId("sonner-toaster");
    expect(sonnerElement).toBeInTheDocument();
    expect(sonnerElement).toHaveAttribute("data-theme", "system");
    expect(sonnerElement).toHaveClass("toaster group");
    expect(sonnerElement).toHaveStyle({
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)",
    });
  });

  test('should render Sonner with the provided "light" theme', () => {
    mockUseTheme.mockReturnValue({ theme: "light" });
    render(<Toaster />);

    const sonnerElement = screen.getByTestId("sonner-toaster");
    expect(sonnerElement).toBeInTheDocument();
    expect(sonnerElement).toHaveAttribute("data-theme", "light");
  });

  test('should render Sonner with the provided "dark" theme', () => {
    mockUseTheme.mockReturnValue({ theme: "dark" });
    render(<Toaster />);

    const sonnerElement = screen.getByTestId("sonner-toaster");
    expect(sonnerElement).toBeInTheDocument();
    expect(sonnerElement).toHaveAttribute("data-theme", "dark");
  });

  test("should apply CSS classes and styles correctly", () => {
    mockUseTheme.mockReturnValue({ theme: "light" });
    render(<Toaster />);

    const sonnerElement = screen.getByTestId("sonner-toaster");
    expect(sonnerElement).toHaveClass("toaster group");
    expect(sonnerElement).toHaveStyle({
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)",
    });
  });

  test("should pass other props to the Sonner component", () => {
    mockUseTheme.mockReturnValue({ theme: "light" });
    const customProps = {
      position: "top-center",
      richColors: true,
      closeButton: true,
    } as const;

    render(<Toaster {...customProps} />);

    expect(mockedSonnerImplementation).toHaveBeenCalledTimes(1);

    const sonnerProps = mockedSonnerImplementation.mock.calls[0][0];

    expect(sonnerProps).toMatchObject({
      theme: "light",
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      },
      ...customProps,
    });

    expect(sonnerProps.richColors).toBe(true);
    expect(sonnerProps.closeButton).toBe(true);
    expect(sonnerProps.position).toBe("top-center");
  });

  test('should use the "system" theme if useTheme returns an empty object', () => {
    mockUseTheme.mockReturnValue({});
    render(<Toaster />);

    const sonnerElement = screen.getByTestId("sonner-toaster");
    expect(sonnerElement).toHaveAttribute("data-theme", "system");
  });
});
