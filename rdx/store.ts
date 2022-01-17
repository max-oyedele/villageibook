import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import logger from "redux-logger";

import { authSlice } from "./slices/auth";
import { accountSlice } from "./slices/account";
import { commonSlice } from "./slices/common";
import { viewPageSlice } from "./slices/viewPage";
import { feedPageSlice } from "./slices/feedPage";
import { villagePageSlice } from "./slices/villagePage";
import { graduatePageSlice } from "./slices/graduatePage";
import { adminSlice } from "./slices/admin"

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  accountReducer: accountSlice.reducer,
  commonReducer: commonSlice.reducer,
  viewPageReducer: viewPageSlice.reducer,
  feedPageReducer: feedPageSlice.reducer,
  villagePageReducer: villagePageSlice.reducer,
  graduatePageReducer: graduatePageSlice.reducer,  
  adminReducer: adminSlice.reducer
});
export type OurStore = ReturnType<typeof combinedReducers>;

const rootReducer = (
  state: ReturnType<typeof combinedReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
const makeStore: MakeStore = () => store;

export const wrapper = createWrapper(makeStore, { storeKey: "key" });

export type MyThunkDispatch = typeof store.dispatch;
