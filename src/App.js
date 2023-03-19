import './App.css';
import { SocketContextProvider } from './context/socket-context';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';
import API from './servicies/api';

window.api = new API;

function App() {
  return (
    <SocketContextProvider>
      {/* <ChatPage /> */}
      <LoginPage />
    </SocketContextProvider>
  )
}

export default App;
