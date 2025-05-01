import React, { useState } from 'react';

const Register = ({ onShowLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (username && password) {
            try {
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Registration failed');
                }
                alert('Registration successful! You can now log in.');
                onShowLogin();

            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed: ' + error.message);
            }
        }
        else {
            alert('Please fill in all fields.');
        }
    }

    return (
        <div>
            <h2>Register</h2>
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
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <span onClick={onShowLogin}>Login Here!</span></p>
        </div>
    );
};

export default Register;