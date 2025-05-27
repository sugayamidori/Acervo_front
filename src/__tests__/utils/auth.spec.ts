jest.mock("cookies-next", () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

let mockedSetCookie: jest.Mock;
let mockedDeleteCookie: jest.Mock;
let currentCookieToken: string;
let currentCookieLoginConstant: string;

const originalNodeEnv = process.env.NODE_ENV;

describe("Cookie Utils", () => {
  beforeEach(async () => {
    process.env.NODE_ENV = "test";
    jest.resetModules();

    const cookiesNextModule = await import("cookies-next");
    mockedSetCookie = cookiesNextModule.setCookie as jest.Mock;
    mockedDeleteCookie = cookiesNextModule.deleteCookie as jest.Mock;

    const constantsModule = await import("@acervo/constants/cookies");
    currentCookieToken = constantsModule.COOKIE_TOKEN;
    currentCookieLoginConstant = constantsModule.COOKIE_LOGIN;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    if (mockedSetCookie) mockedSetCookie.mockClear();
    if (mockedDeleteCookie) mockedDeleteCookie.mockClear();
  });

  const mockAccessToken = "test_access_token_123";
  const mockUsuarioData = { id: "user1", nome: "Test User" };
  let mockResponse: Response;

  describe("setCookieLogin", () => {
    beforeEach(() => {
      mockResponse = {
        json: jest.fn().mockResolvedValue({
          access_token: mockAccessToken,
          usuario: mockUsuarioData,
        }),
      } as unknown as Response;
    });

    const expectedCookieOptions = (isProduction: boolean) => ({
      path: "/",
      maxAge: 90 * 60,
      secure: isProduction,
      sameSite: "lax",
    });

    test("should call setCookie twice with correct parameters in production", async () => {
      process.env.NODE_ENV = "production";

      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });

      expect(mockedSetCookie).toHaveBeenCalledTimes(2);
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieToken,
        mockAccessToken,
        expectedCookieOptions(true)
      );
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieLoginConstant,
        mockUsuarioData,
        expectedCookieOptions(true)
      );
    });

    test("should call setCookie twice with correct parameters in development", async () => {
      process.env.NODE_ENV = "development";

      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });

      expect(mockedSetCookie).toHaveBeenCalledTimes(2);
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieToken,
        mockAccessToken,
        expectedCookieOptions(false)
      );
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieLoginConstant,
        mockUsuarioData,
        expectedCookieOptions(false)
      );
    });

    test("should call setCookie twice with secure: false if NODE_ENV is undefined", async () => {
      delete process.env.NODE_ENV;

      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });

      expect(mockedSetCookie).toHaveBeenCalledTimes(2);
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieToken,
        mockAccessToken,
        expectedCookieOptions(false)
      );
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieLoginConstant,
        mockUsuarioData,
        expectedCookieOptions(false)
      );
    });

    test("should call response.json() to get access token and user data", async () => {
      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    test("should handle if response.json() fails and not call setCookie", async () => {
      mockResponse.json = jest
        .fn()
        .mockRejectedValue(new Error("Failed to parse JSON"));

      const { setCookieLogin } = await import("@acervo/utils/auth");

      await expect(setCookieLogin({ response: mockResponse })).rejects.toThrow(
        "Failed to parse JSON"
      );
      expect(mockedSetCookie).not.toHaveBeenCalled();
    });
  });

  describe("clearToken", () => {
    test("should call deleteCookie with the correct cookie name for token", async () => {
      const { clearToken } = await import("@acervo/utils/auth");
      await clearToken();
      expect(mockedDeleteCookie).toHaveBeenCalledTimes(1);
      expect(mockedDeleteCookie).toHaveBeenCalledWith(currentCookieToken);
    });
  });
});
