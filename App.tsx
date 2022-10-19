import NavContainer from "./NavContainer";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ThemeProvider from "./features/theme/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavContainer />
      </Provider>
    </ThemeProvider>
  );
}
