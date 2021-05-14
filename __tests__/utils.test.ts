import { getPokeColor } from "../utils";

test("getPokeColor", () => {
  expect(typeof getPokeColor("black")).toBe("string");
});
