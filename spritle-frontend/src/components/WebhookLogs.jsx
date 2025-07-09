import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const WebhookLogs = () => {
    const [logs, setLogs] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await api.get('/logs');
            if (response.data.logs) {
                setLogs(response.data.logs);
            } else {
                setMessage('No logs found.');
            }
        } catch (err) {
            setMessage('Failed to fetch webhook logs.');
            console.error(err);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h2 style={styles.heading}>Webhook Logs</h2>
                <button style={styles.backBtn} onClick={() => navigate('/tickets')}> Back</button>
            </div>

            {message && <p style={styles.message}>{message}</p>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>S.No</th>
                        <th style={styles.th}>Event Type</th>
                        <th style={styles.th}>Timestamp</th>
                        <th style={styles.th}>Payload (Preview)</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={log.id}>
                            <td style={styles.td}>{index + 1}</td>
                            <td style={styles.td}>{log.event_type}</td>
                            <td style={styles.td}>
                                {new Date(log.createdAt).toLocaleString()}
                            </td>
                            <td style={styles.td}>
                                <code style={styles.code}>
                                    {JSON.stringify(JSON.parse(log.payload), null, 1).slice(0, 100)}...
                                </code>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    wrapper: {
        padding: '40px',
        fontFamily: 'sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    heading: {
        fontSize: '24px',
        color: '#333'
    },
    backBtn: {
        padding: '8px 16px',
        background: '#4C63B6',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
    },
    message: {
        color: 'red',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: '20px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
    },
    th: {
        backgroundColor: '#f2f2f2',
        padding: '12px',
        textAlign: 'left'
    },
    td: {
        padding: '12px',
        borderBottom: '1px solid #eee',
        verticalAlign: 'top'
    },
    code: {
        fontSize: '12px',
        fontFamily: 'monospace',
        color: '#444',
        whiteSpace: 'pre-wrap'
    }
};


export default WebhookLogs;
