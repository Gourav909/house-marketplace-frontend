import { getErrorMessage } from "src/utils/errorHandler";

const pendingState = (state) => {
  state.fetching = true;
  state.isError = false;
  state.isSuccess = false;
  state.isLoading = true;
  state.error = [];
};

const fulfilledState = (state) => {
  state.fetching = false;
  state.isError = false;
  state.isSuccess = true;
  state.isLoading = false;
  state.error = [];
};

const rejectedState = (state, action) => {
  state.fetching = false;
  state.isError = true;
  state.isSuccess = false;
  state.isLoading = false;
  state.error = getErrorMessage(action.payload);
};

export { pendingState, fulfilledState, rejectedState };
