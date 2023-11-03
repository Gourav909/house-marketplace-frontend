import { flattenNestedObject } from "../flattenObject";

describe("flattenNestedObject function", () => {
  it("should flatten a nested object", () => {
    const nestedObject = {
      name: "John",
      age: 30,
      address: {
        districes: "Beitou",
        city: "Taipei city",
      },
    };

    const flattenedObject = flattenNestedObject(nestedObject);

    expect(flattenedObject).toEqual({
      "name": "John",
      "age": 30,
      "districes": "Beitou",
      "city": "Taipei city",
    });
  });

  it("should handle an empty object", () => {
    const emptyObject = {};
    const flattenedObject = flattenNestedObject(emptyObject);

    expect(flattenedObject).toEqual({});
  });
});
