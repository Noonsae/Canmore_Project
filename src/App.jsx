import Provider from "./context/Provider";
import Router from "./shared/Router";
import GlobalStyle from "./styles/GlobalStyle";
import { FeedProvider } from "./context/FeedContext";

const App = () => {
  return (
    <FeedProvider>
      <Provider>
        <GlobalStyle />
        <Router /> {/* Router 컴포넌트가 이미 모든 경로를 처리 */}
      </Provider>
    </FeedProvider>
  );
};

export default App;
