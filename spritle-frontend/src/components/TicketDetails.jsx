import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    const [contact, setContact] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            const response = await api.get('/ticket-conversations/' + id, { ticket_id: id });

            if (response.data.conversations) {
                setConversations(response.data.conversations);

                const firstEmail = response.data.conversations[0]?.to_emails?.[0];
                
                if (firstEmail) {
                    fetchHubspotContact(firstEmail);
                } else {
                    setMessage('No conversations found');
                }
            } else {
                setMessage('No conversations found');
            }
        } catch (err) {
            console.error(err);
            setMessage('Failed to load conversations');
        }
    };

    const fetchHubspotContact = async (email) => {
        try {
            const response = await api.post('/contact', { email });
            if (response.data.contact) {
                setContact(response.data.contact);
            }
        } catch (error) {
            console.log('HubSpot contact not found');
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h2 style={styles.title}>Ticket #{id} - Conversations</h2>
                <button style={styles.backBtn} onClick={() => navigate('/tickets')}>Back</button>
            </div>

            {contact && (
                <div style={styles.hubspotBox}>
                    <h3>HubSpot Contact Details</h3>
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Phone:</strong> {contact.phone || '—'}</p>
                    <p><strong>Company:</strong> {contact.company || '—'}</p>
                    <p><strong>Stage:</strong> {contact.lifecycle_stage}</p>
                </div>
            )}

            {message && <p style={styles.message}>{message}</p>}

            <div style={styles.chatBox}>
                {conversations.map((conv, index) => (
                    <div key={conv.id} style={styles.messageCard}>
                        <p><strong>From:</strong> {conv.from_email}</p>
                        <p>{conv.body_text}</p>
                        <p style={styles.time}> {new Date(conv.created_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        padding: '30px',
        fontFamily: 'sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        fontSize: '20px',
        fontWeight: '600'
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
        marginBottom: '15px'
    },
    hubspotBox: {
        background: '#fffef2',
        border: '1px solid #e4dccc',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '25px'
    },
    chatBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    messageCard: {
        background: '#f4f4f4',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd'
    },
    time: {
        fontSize: '12px',
        color: '#666',
        marginTop: '8px'
    }
};

export default TicketDetails;
