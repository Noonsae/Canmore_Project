import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';
import { FeedProvider } from './context/FeedContext';
import {UserProvider} from './context/userContext'

const App = () => {

  return (
    <UserProvider>
    <FeedProvider>
      <GlobalStyle />
      <Router /> {/* Router 컴포넌트가 이미 모든 경로를 처리 */}
    </FeedProvider>
    </UserProvider>
  );
};

export default App;
