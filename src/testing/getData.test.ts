import { describe, test, expect } from "@jest/globals";

import { getData } from "../func/dataFeatures.js";

describe("Unit testing for 'getData' function", () => {
  test("Should return an 'Array' when is invoked", () => {
    const products = getData();
    const isArray = Array.isArray(products);
    expect(isArray).toBeTruthy();
  });
});
