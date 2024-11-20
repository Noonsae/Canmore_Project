import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import { FeedProvider } from './context/FeedContext';

const App = () => {
  return (
    <FeedProvider>
      <Router />
      <GlobalStyle />
    </FeedProvider>
  );
};

export default App;
