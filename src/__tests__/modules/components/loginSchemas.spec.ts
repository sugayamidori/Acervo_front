import { loginAdminSchema } from "@acervo/modules/auth/components/login-form/schemas";

describe("loginAdminSchema", () => {
  const schema = loginAdminSchema();

  test("should validate correct data successfully", () => {
    const validData = { email: "test@example.com", password: "password123" };
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("email validation", () => {
    test("should fail if email is empty", () => {
      const invalidData = { email: "", password: "password123" };
      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("E-mail inválido");
      }
    });

    test("should fail if email is not a valid email format", () => {
      const invalidData = { email: "invalidemail", password: "password123" };
      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("E-mail inválido");
      }
    });

    test("should fail if email exceeds max length", () => {
      const longEmail = "a".repeat(129) + "@example.com";
      const invalidData = { email: longEmail, password: "password123" };
      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Máximo de 128 caracteres");
      }
    });
  });

  describe("password validation", () => {
    test("should fail if password is empty", () => {
      const invalidData = { email: "test@example.com", password: "" };
      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Mínimo de 6 caracteres");
      }
    });

    test("should fail if password is too short", () => {
      const invalidData = { email: "test@example.com", password: "123" };
      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Mínimo de 6 caracteres");
      }
    });

    test("should fail if password is too long", () => {
      const invalidData = {
        email: "test@example.com",
        password: "a".repeat(13),
      };
      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Máximo de 12 caracteres");
      }
    });
  });
});
