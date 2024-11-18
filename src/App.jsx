import Provider from "./context/Provider";
import Router from "./shared/Router";
import GlobalStyle from "./styles/GlobalStyle";
import { FeedProvider } from "./context/FeedContext";

const App = () => {
  return (
<Provider>
  <FeedProvider>
    <GlobalStyle />
    <Router />
  </FeedProvider>
</Provider>
  );
};

export default App;
