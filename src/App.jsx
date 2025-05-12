import { RouterProvider } from "react-router-dom";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import router from "./routes/router";
import GlobalStyle from "./styles/globalStyles";
import { theme } from "./styles/theme";

function App() {
  return (
    <>
      <StyleSheetManager target={document.head}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </StyleSheetManager>
    </>
  );
}

export default App;
