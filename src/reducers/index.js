import { combineReducers } from "redux";
import productosReducer from "./productosReducers";
import alertaReducer from "./alertaReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["productos"],
};

const rootReducer = combineReducers({
  productos: productosReducer,
  alerta: alertaReducer,
});

export default persistReducer(persistConfig, rootReducer);