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
                    console.log(data.message.message[0]);
                    throw new Error(data.message.message[0]|| 'Registration failed');
                }
                alert('Registration successful! You can now log in.');
                onShowLogin();

            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed: ' + error);
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