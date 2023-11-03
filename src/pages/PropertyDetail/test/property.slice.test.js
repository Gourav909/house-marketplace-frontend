import { configureStore } from "@reduxjs/toolkit";

import propertyDetailReducer, {
  fetchPropertyDetail,
  clearState,
} from "src/pages/PropertyDetail/property.slice";

describe("propertyDetail slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        propertyDetail: propertyDetailReducer,
      },
    });
  });

  it("should handle a successful property detail fetch", async () => {
    const mockPropertyData = { id: 1, name: "Sample Property" };
    const mockData = {
      data: {
        propertyDetail: mockPropertyData,
      },
    };

    await store.dispatch(fetchPropertyDetail.fulfilled(mockData));
    const { propertyDetail } = store.getState();

    expect(propertyDetail.isSuccess).toBe(true);
    expect(propertyDetail.isError).toBe(false);
    expect(propertyDetail.data.propertyDetail).toEqual(mockPropertyData);
  });

  it("should handle clearing the state", () => {
    store.dispatch(fetchPropertyDetail(1));
    store.dispatch(clearState());
    const { propertyDetail } = store.getState();

    expect(propertyDetail).toEqual(propertyDetailReducer(undefined, {}));
  });

  it("should handle a failed property detail fetch", async () => {
    const mockError = "An error occurred";
    await store.dispatch(fetchPropertyDetail.rejected(mockError));
    const { propertyDetail } = store.getState();

    expect(propertyDetail.isSuccess).toBe(false);
    expect(propertyDetail.isError).toBe(true);
  });
});
