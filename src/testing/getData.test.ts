import { describe, test, expect } from "@jest/globals";

import { getProducts } from "../func/dataFeatures.js";

describe("Unit testing for 'getProducts' function", () => {
  test("Should return an 'Array' when is invoked", () => {
    const products = getProducts();
    const isArray = Array.isArray(products);
    expect(isArray).toBeTruthy();
  });
});
