import { registerAdminSchema } from "@acervo/modules/auth/components/register-form/schemas";
import { ROLE } from "@acervo/constants/roles";

describe("registerAdminSchema", () => {
  const schema = registerAdminSchema();

  const validData = {
    username: "Test User",
    email: "test@example.com",
    password: "password123",
    roles: [ROLE.admin],
  };

  it("should validate correct data successfully", () => {
    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should allow optional roles to be undefined or empty array", () => {
    expect(schema.safeParse({ ...validData, roles: undefined }).success).toBe(
      true
    );
    expect(schema.safeParse({ ...validData, roles: [] }).success).toBe(true);
  });

  describe("username validation", () => {
    it("should fail if username is empty", () => {
      const result = schema.safeParse({ ...validData, username: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Mínimo de 1 caracteres");
      }
    });

    it("should use required_error if username key is missing (Zod default)", () => {
      const dataWithoutUsername = {
        email: validData.email,
        password: validData.password,
      };
      const result = schema.safeParse(dataWithoutUsername);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Insira seu nome completo");
      }
    });

    it("should fail if username exceeds max length", () => {
      const result = schema.safeParse({
        ...validData,
        username: "a".repeat(129),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Máximo de 128 caracteres");
      }
    });
  });

  describe("email validation", () => {
    it("should fail if email is empty", () => {
      const result = schema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("E-mail inválido");
      }
    });

    it("should fail if email is not a valid email format", () => {
      const result = schema.safeParse({ ...validData, email: "invalidemail" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("E-mail inválido");
      }
    });
  });

  describe("password validation", () => {
    it("should fail if password is empty", () => {
      const result = schema.safeParse({ ...validData, password: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Mínimo de 6 caracteres");
      }
    });

    it("should fail if password is too short", () => {
      const result = schema.safeParse({ ...validData, password: "123" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Mínimo de 6 caracteres");
      }
    });

    it("should fail if password is too long", () => {
      const result = schema.safeParse({
        ...validData,
        password: "a".repeat(13),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Máximo de 12 caracteres");
      }
    });
  });

  describe("roles validation", () => {
    it("should fail if roles contains an invalid role string", () => {
      const result = schema.safeParse({
        ...validData,
        roles: ["ROLE_INVALID"],
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Invalid enum value.");
      }
    });
  });
});
