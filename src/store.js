import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";

import { persistStore } from "redux-persist";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),

    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const persistor = persistStore(store);

export { store, persistor };
