import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit'
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper'
import logger from 'redux-logger'

import { authSlice } from './slices/auth'
import { regionSlice } from './slices/region'
import { districtSlice } from './slices/district'
import { upazilaSlice } from './slices/upazila'
import { villageSlice } from './slices/village'
import { browsePageSlice} from './slices/browsePage'
import { villagePageSlice} from './slices/villagePage'

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  regionReducer: regionSlice.reducer,
  districtReducer: districtSlice.reducer,
  upazilaReducer: upazilaSlice.reducer,
  villageReducer: villageSlice.reducer,
  villagePageReducer: villagePageSlice.reducer,
  browsePageReducer: browsePageSlice.reducer
})
export type OurStore = ReturnType<typeof combinedReducers>

const rootReducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
const makeStore: MakeStore = () => store

export const wrapper = createWrapper(makeStore, { storeKey: 'key' })

export type MyThunkDispatch = typeof store.dispatch
