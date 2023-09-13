import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userPersistedReducer from "./redux-features/userSlice";
// redux-persist
import { PersistGate } from "redux-persist/integration/react";
import postPersistedReducer from "./redux-features/postSlice";
import { persistStore } from "redux-persist";

import ImageReducer from "./redux-features/openImage";

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    posts: postPersistedReducer,
    openImage: ImageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
