import { Container } from 'semantic-ui-react'
import './App.css';
import Home from './components/Home';
import SocketIOContext, {socket} from './utils/socket.io';


function App() {
  return (
    <SocketIOContext.Provider value={socket}>
      <Container>
        <Home />
      </Container>
    </SocketIOContext.Provider>
  );
}

export default App;
