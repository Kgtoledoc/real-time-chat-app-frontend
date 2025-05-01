import React, {useState} from "react";

const Login = ({ onLoginSuccess, onShowRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Login failed');
                }

                const data = await response.json();
                localStorage.setItem('token', data.token);
                onLoginSuccess();

            } catch (error) {
                console.error('Error during login:', error);
                alert('Login failed: ' + error.message);
            }
        } else {
            alert('Please fill in all fields.');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <span onClick={onShowRegister}>Register Here!</span></p>
        </div>
    );
}

export default Login;