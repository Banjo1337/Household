import NavContainer from "./NavContainer";
import { store } from "./app/store";
import { Provider } from "react-redux";
import React from "react";

export default function App() {
  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
}
