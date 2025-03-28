/**
 * @jest-environment node
 */
import { GET } from "@/app/api/portfolio/route";

describe("Portfolio API", () => {
  it("should return portfolio data", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
  });
});
