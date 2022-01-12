
describe("MP08 /manage-product/v1/brands?query,sort,limit,page", () => {
  test("should be return success", () => {});
  test("query should by field name should return success", () => {})
});

describe("MP09 /manage-product/v1/private/brands?query,sort,limit,page", () => {
  test("should be return success", () => {});
  test("missing header authorization should be return false", () => {});
  test("query should by field name should return success", () => {})
});

describe("MP10 /manage-product/v1/brands/{id}", () => {
  test("get product public should return success", () => {});
  test("invalid id should be return false", () => {});
});

describe("MP11 /manage-product/v1/private/brands/{id}", () => {
  test("get product public should return success", () => {});
  test("invalid id should be return false", () => {});
});

describe("MP12 /manage-product/v1/brands", () => {
  test("missing parameter body should return false", () => {});
  test("should return success", () => {});
});

describe("MP13 /manage-product/v1/brands/{id}", () => {
  test("update brand should be success", () => {});
  test("body product is empty should be false", () => {});
  test("invalid id should return false", () => {});
});

describe("MP14 /manage-product/v1/brands/{id}", () => {
  test("delete brand should be success", () => {});
  test("missing header authorization should be return false", () => {});
  test("invalid id should return false", () => {});
});
