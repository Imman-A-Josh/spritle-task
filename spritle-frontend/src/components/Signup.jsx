import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Signup = () => {
    const [form, setForm] = useState({
        user_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const navigate = useNavigate();


    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.user_name || !form.email || !form.password || !form.confirm_password) {
            return setMessage('All fields are required');
        }

        if (form.password !== form.confirm_password) {
            return setMessage('Passwords do not match');
        }

        try {
            const response = await api.post('/signup', form);
            setMessage(response.data.message || 'Signup successful');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Your Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="user_name"
                        placeholder="Username"
                        value={form.user_name}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Sign Up</button>
                    <p style={{ textAlign: 'center', marginTop: '15px' }}>
                        Already have an account?{' '}
                        <a
                            style={{ color: '#4C63B6', textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </a>
                    </p>

                </form>
                {message && (
                    <p
                        style={{
                            ...styles.message,
                            color: message.includes('success') || message.includes('✅') ? 'green' : 'red'
                        }}
                    >
                        {message}
                    </p>
                )}

            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        height: '100vh',
        backgroundColor: '#f7f8fc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        background: '#ffffff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
        outline: 'none'
    },
    button: {
        marginTop: '10px',
        padding: '12px',
        backgroundColor: '#4C63B6',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    message: {
        marginTop: '20px',
        textAlign: 'center',
        fontWeight: '500'
    }

};

export default Signup;
