import { useState } from 'react'
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css'


function App() {
  const [view, setView] = useState('register');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (token, username) => {
    setToken(token);
    setUsername(username);
    setView('chat');
  }

  return(
    <div>
      <h1>Chat Application</h1>
      {view === 'register' && <Register onShowLogin={() => setView('login')} />}
      {view === 'login' && <Login onLoginSuccess={handleLoginSuccess} onShowRegister={() => setView('register')} />}
      {view === 'chat' && <Chat token={token} username={username} />}
    </div>
  )
}

export default App
