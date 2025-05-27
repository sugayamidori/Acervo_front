import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Header } from '@acervo/components/header/index';
import { Logo } from '@acervo/constants/index';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
  });

  test('renders logo with correct link and image', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: Logo.title });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImage = screen.getByAltText(Logo.title);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', Logo.logo);
  });

  test('renders search input and handles search term change', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Busque por um livro') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, 'Mistério');
    expect(searchInput.value).toBe('Mistério');
  });

  test('handles search on Enter key press', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Busque por um livro');
    await user.type(searchInput, 'Aventura{enter}');

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/search?query=Aventura');
    expect((searchInput as HTMLInputElement).value).toBe('');
  });

  test('handles search on search icon click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Busque por um livro');
    await user.type(searchInput, 'Romance');

    const searchIconContainer = screen.getByTestId('search-icon').parentElement;
    expect(searchIconContainer).toBeInTheDocument();
    if (searchIconContainer) {
      await user.click(searchIconContainer);
    }

    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith('/search?query=Romance');
    expect((searchInput as HTMLInputElement).value).toBe('');
  });

  test('does not trigger search if search term is empty', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Busque por um livro');
    await user.type(searchInput, '{enter}');
    expect(mockRouterPush).not.toHaveBeenCalled();

    const searchIconContainer = screen.getByTestId('search-icon').parentElement;
    if (searchIconContainer) {
      await user.click(searchIconContainer);
    }
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  test('does not trigger search if search term is only whitespace', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Busque por um livro');
    await user.type(searchInput, '   {enter}');
    expect(mockRouterPush).not.toHaveBeenCalled();
    expect((searchInput as HTMLInputElement).value).toBe('   ');

    const searchIconContainer = screen.getByTestId('search-icon').parentElement;
    if (searchIconContainer) {
      await user.click(searchIconContainer);
    }
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  test('toggles mobile menu and displays correct icon and links', async () => {
    const user = userEvent.setup();
    render(<Header />);
    let menuButton = screen.getByRole('button', { name: /abrir menu/i });

    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mobile-dropdown')).not.toBeInTheDocument();

    await user.click(menuButton);

    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
    
    const mobileMenu = screen.getByTestId('mobile-dropdown');
    expect(mobileMenu).toBeInTheDocument();

    const allLoginLinksOnPageWhenMobileOpen = screen.getAllByRole('link', { name: 'Fazer login' });
    const fazerLoginLinksInMobile = allLoginLinksOnPageWhenMobileOpen.filter(link => mobileMenu.contains(link));
    expect(fazerLoginLinksInMobile).toHaveLength(1);
    expect(fazerLoginLinksInMobile[0]).toBeInTheDocument();

    const allCadastreSeLinksOnPageWhenMobileOpen = screen.getAllByRole('link', { name: 'Cadastre-se' });
    const cadastreSeLinksInMobile = allCadastreSeLinksOnPageWhenMobileOpen.filter(link => mobileMenu.contains(link));
    expect(cadastreSeLinksInMobile).toHaveLength(1);
    expect(cadastreSeLinksInMobile[0]).toBeInTheDocument();

    menuButton = screen.getByRole('button', { name: /fechar menu/i });
    await user.click(menuButton);

    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mobile-dropdown')).not.toBeInTheDocument();
  });

  test('renders desktop menu links', () => {
    render(<Header />);
    const allLists = screen.getAllByRole('list');
    const desktopMenuList = allLists.find(list => list.classList.contains('md:flex'));

    if (!desktopMenuList) {
      throw new Error('A lista do menu desktop (ul com classe md:flex) não foi encontrada.');
    }
    expect(desktopMenuList).toBeInTheDocument();
    
    expect(within(desktopMenuList).getByRole('link', { name: 'Fazer login' })).toBeInTheDocument();
    expect(within(desktopMenuList).getByRole('link', { name: 'Cadastre-se' })).toBeInTheDocument();
  });
});