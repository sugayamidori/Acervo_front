import { getCookie } from "cookies-next";

import {
  authLogin,
  authRegisterMember,
  authRegisterAdmin,
} from "@acervo/service/auth";
import { fetchAPI } from "@acervo/service/index";
import { setCookieLogin } from "@acervo/utils/auth";

jest.mock("@acervo/service/index", () => ({
  fetchAPI: jest.fn(),
}));

jest.mock("cookies-next", () => ({
  getCookie: jest.fn(),
}));

jest.mock("@acervo/utils/auth", () => ({
  setCookieLogin: jest.fn(),
}));

const mockedFetchAPI = fetchAPI as jest.Mock;
const mockedGetCookie = getCookie as jest.Mock;
const mockedSetCookieLogin = setCookieLogin as jest.Mock;

describe("Auth Service", () => {
  beforeEach(() => {
    mockedFetchAPI.mockClear();
    mockedGetCookie.mockClear();
    mockedSetCookieLogin.mockClear();
  });

  describe("authLogin", () => {
    const loginData = { email: "test@example.com", password: "password123" };

    test("should call fetchAPI with correct parameters for login", async () => {
      mockedFetchAPI.mockResolvedValue({ status: 400, json: async () => ({}) });
      await authLogin(loginData);
      expect(mockedFetchAPI).toHaveBeenCalledWith({
        url: "usuarios/login",
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginData.email,
            senha: loginData.password,
          }),
        },
      });
    });

    test("should call setCookieLogin and return true on successful login (status 200)", async () => {
      const mockApiResponse = {
        status: 200,
        json: async () => ({ access_token: "fake_token" }),
      };
      mockedFetchAPI.mockResolvedValue(mockApiResponse);
      mockedSetCookieLogin.mockResolvedValue(undefined);

      const result = await authLogin(loginData);

      expect(mockedSetCookieLogin).toHaveBeenCalledWith({
        response: mockApiResponse,
      });
      expect(result).toBe(true);
    });

    test("should not call setCookieLogin and return false on failed login (status !== 200)", async () => {
      mockedFetchAPI.mockResolvedValue({
        status: 401,
        json: async () => ({ error: "Unauthorized" }),
      });

      const result = await authLogin(loginData);

      expect(mockedSetCookieLogin).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });

  describe("authRegisterMember", () => {
    const registerData = {
      username: "newuser",
      email: "new@example.com",
      password: "newpassword123",
    };

    test("should call fetchAPI with correct parameters for member registration", async () => {
      mockedFetchAPI.mockResolvedValue({ status: 400 });
      await authRegisterMember(registerData);
      expect(mockedFetchAPI).toHaveBeenCalledWith({
        url: "usuarios/membros",
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login: registerData.username,
            email: registerData.email,
            senha: registerData.password,
          }),
        },
      });
    });

    test("should return true if member registration is successful (status 201)", async () => {
      mockedFetchAPI.mockResolvedValue({ status: 201 });
      const result = await authRegisterMember(registerData);
      expect(result).toBe(true);
    });

    test("should return false if member registration fails (status !== 201)", async () => {
      mockedFetchAPI.mockResolvedValue({ status: 400 });
      const result = await authRegisterMember(registerData);
      expect(result).toBe(false);
    });
  });

  describe("authRegisterAdmin", () => {
    const registerAdminData = {
      username: "adminuser",
      email: "admin@example.com",
      password: "adminpassword",
      roles: ["ROLE_ADMIN"],
    };
    const mockToken = "mock_admin_token";
    const mockContext = { req: {}, res: {} } as any;

    test("should call getCookie and fetchAPI with correct parameters for admin registration", async () => {
      mockedGetCookie.mockReturnValue(mockToken);
      mockedFetchAPI.mockResolvedValue({ status: 400 });

      await authRegisterAdmin(registerAdminData, mockContext);

      expect(mockedGetCookie).toHaveBeenCalledWith("access_token", mockContext);
      expect(mockedFetchAPI).toHaveBeenCalledWith({
        url: "usuarios",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mockToken}`,
          },
          body: JSON.stringify({
            login: registerAdminData.username,
            email: registerAdminData.email,
            senha: registerAdminData.password,
            roles: registerAdminData.roles,
          }),
        },
      });
    });

    test("should return true if admin registration is successful (status 201)", async () => {
      mockedGetCookie.mockReturnValue(mockToken);
      mockedFetchAPI.mockResolvedValue({ status: 201 });
      const result = await authRegisterAdmin(registerAdminData, mockContext);
      expect(result).toBe(true);
    });

    test("should return false if admin registration fails (status !== 201)", async () => {
      mockedGetCookie.mockReturnValue(mockToken);
      mockedFetchAPI.mockResolvedValue({ status: 400 });
      const result = await authRegisterAdmin(registerAdminData, mockContext);
      expect(result).toBe(false);
    });
  });
});
