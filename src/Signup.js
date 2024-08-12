import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const register = async () => {
        try {
            await axios.post('http://localhost:3001/register', { username, password, role });
            alert('Registration successful');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={register}>Signup</button>
        </div>
    );
}

export default Signup;
