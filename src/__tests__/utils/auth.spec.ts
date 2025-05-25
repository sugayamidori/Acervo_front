jest.mock("cookies-next", () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

let mockedSetCookie: jest.Mock;
let mockedDeleteCookie: jest.Mock;
let currentCookieToken: string;

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
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    if (mockedSetCookie) mockedSetCookie.mockClear();
    if (mockedDeleteCookie) mockedDeleteCookie.mockClear();
  });

  const mockAccessToken = "test_access_token_123";
  let mockResponse: Response;

  describe("setCookieLogin", () => {
    beforeEach(() => {
      mockResponse = {
        json: jest.fn().mockResolvedValue({ access_token: mockAccessToken }),
      } as unknown as Response;
    });

    test("should call setCookie with correct parameters in production", async () => {
      (process.env as any).NODE_ENV = "production";

      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });

      expect(mockedSetCookie).toHaveBeenCalledTimes(1);
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieToken,
        mockAccessToken,
        expect.objectContaining({ secure: true })
      );
    });

    test("should call setCookie with correct parameters in development", async () => {
      (process.env as any).NODE_ENV = "development";

      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });

      expect(mockedSetCookie).toHaveBeenCalledTimes(1);
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieToken,
        mockAccessToken,
        expect.objectContaining({ secure: false })
      );
    });

    test("should call setCookie with secure: false if NODE_ENV is undefined", async () => {
      (process.env as any).NODE_ENV = undefined;

      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });

      expect(mockedSetCookie).toHaveBeenCalledTimes(1);
      expect(mockedSetCookie).toHaveBeenCalledWith(
        currentCookieToken,
        mockAccessToken,
        expect.objectContaining({ secure: false })
      );
    });

    test("should call response.json() to get the access token", async () => {
      const { setCookieLogin } = await import("@acervo/utils/auth");
      await setCookieLogin({ response: mockResponse });
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    test("should handle if response.json() fails", async () => {
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
    test("should call deleteCookie with the correct cookie name", async () => {
      const { clearToken } = await import("@acervo/utils/auth");
      await clearToken();
      expect(mockedDeleteCookie).toHaveBeenCalledTimes(1);
      expect(mockedDeleteCookie).toHaveBeenCalledWith(currentCookieToken);
    });
  });
});
