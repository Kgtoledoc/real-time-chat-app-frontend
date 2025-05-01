import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
