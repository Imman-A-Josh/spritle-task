import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await api.get('/tickets');
            if (response.data.tickets) {
                setTickets(response.data.tickets);
            } else {
                setMessage('No tickets found');
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch tickets');
        }
    };

    const handleView = (ticketId) => {
        navigate(`/ticket/${ticketId}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.heading}> Freshdesk Tickets</h2>
                <button style={styles.backBtn} onClick={() => navigate('/webhooks')}>View Webhooks</button>
            </div>

            {message && (
                <p style={{ color: message.includes('') ? 'red' : 'green' }}>{message}</p>
            )}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>S.No</th>
                        <th style={styles.th}>Subject</th>
                        <th style={styles.th}>Ticket Id</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={ticket.id}>
                            <td style={styles.td}>{index + 1}</td>
                            <td style={styles.td}>
                                <a href="#" onClick={() => handleView(ticket.id)} style={styles.link}>
                                    {ticket.subject}
                                </a>
                            </td>
                            <td style={styles.td}>{ticket.id}</td>
                            <td
                                style={{
                                    ...styles.td,
                                    color:
                                        ticket.status === 3
                                            ? 'green'
                                            : ticket.status === 1
                                                ? 'red'
                                                : '#333'
                                }}
                            >
                                {ticket.status === 1
                                    ? 'Pending'
                                    : ticket.status === 2
                                        ? 'Open'
                                        : ticket.status === 3
                                            ? 'Resolved'
                                            : ticket.status === 4
                                                ? 'Closed'
                                                : 'Waiting'}
                            </td>

                            <td
                                style={{
                                    ...styles.td,
                                    color: ticket.priority === 4 ? 'red' : '#333'
                                }}
                            >
                                {ticket.priority === 1
                                    ? 'Low'
                                    : ticket.priority === 2
                                        ? 'Medium'
                                        : ticket.priority === 3
                                            ? 'High'
                                            : ticket.priority === 4
                                                ? 'Urgent'
                                                : 'Unknown'}
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
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
        color: '#333',
        margin: 0
    },

    backBtn: {
        padding: '8px 16px',
        background: '#4C63B6',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
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
        borderBottom: '1px solid #eee'
    },

    link: {
        color: '#4C63B6',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
};


export default TicketList;
