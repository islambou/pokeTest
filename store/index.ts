import { createStore, compose } from "redux";
import { persistStore } from "redux-persist";

import rootReducer from "./reducers";

const enhancers = [];
//@ts-ignore
if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(
    //@ts-ignore

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
export const store = createStore(rootReducer, compose(...enhancers));

export const persistor = persistStore(store);
