import { describe, expect, it } from "vitest";
import { extractHashOrId } from "@/lib/qr";

describe("QR Code parser (extractHashOrId)", () => {
  it("extracts verification hash from full URL with ?hash=", () => {
    const url = "https://tochidevstudio.in/verify?hash=a7b8c9d0e1f2";
    expect(extractHashOrId(url)).toBe("a7b8c9d0e1f2");
  });

  it("extracts student ID from full URL with ?id=", () => {
    const url = "https://tochidevstudio.in/verify?id=TCL-26Q4-WEB-0001";
    expect(extractHashOrId(url)).toBe("TCL-26Q4-WEB-0001");
  });

  it("extracts q query parameter if present", () => {
    const url = "https://tochidevstudio.in/verify?q=TCL-9999";
    expect(extractHashOrId(url)).toBe("TCL-9999");
  });

  it("extracts pathname segment if path contains the code", () => {
    const url = "https://tochidevstudio.in/verify/TCL-26Q4-WEB-0001";
    expect(extractHashOrId(url)).toBe("TCL-26Q4-WEB-0001");
  });

  it("returns raw text if not a URL", () => {
    expect(extractHashOrId("TCL-26Q4-WEB-0001")).toBe("TCL-26Q4-WEB-0001");
    expect(extractHashOrId("a7b8c9d0e1f2")).toBe("a7b8c9d0e1f2");
  });

  it("handles whitespace and empty strings gracefully", () => {
    expect(extractHashOrId("   ")).toBe("");
    expect(extractHashOrId("  TCL-26Q4-WEB-0001  ")).toBe("TCL-26Q4-WEB-0001");
  });
});
