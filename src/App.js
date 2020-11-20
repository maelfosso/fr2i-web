import { Container } from 'semantic-ui-react'
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import SocketIOContext, {socket} from './utils/socket.io';


function App() {
  return (
    <SocketIOContext.Provider value={socket}>
      <div>
        <Nav />
        <Container>
          <Home />
        </Container>
      </div>
    </SocketIOContext.Provider>
  );
}

export default App;
