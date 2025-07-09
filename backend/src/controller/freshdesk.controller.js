const axios = require('axios');


exports.getFreshdeskTickets = async (req, res) => {

    const domain = process.env.FRESHDESK_DOMAIN;
    const api_key = process.env.FRESHDESK_API_KEY;

    if (!domain || !api_key) {
        return res.status(400).json({ message: "Domain and API key are required" });
    }

    try {
        const response = await axios.get(`https://${domain}.freshdesk.com/api/v2/tickets`, {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${api_key}:X`).toString('base64')
            }
        });

        return res.status(200).json({ message: "Tickets fetched successfully", tickets: response.data });

    } catch (error) {
        console.error("Freshdesk API Error:", error || error.message);
        return res.status(500).json({ message: "Failed to fetch tickets", error: error.message });
    }
};

exports.createTicket = async (req, res) => {

    const domain = process.env.FRESHDESK_DOMAIN;
    const api_key = process.env.FRESHDESK_API_KEY;

    const { email, subject, description } = req.body;

    if (!domain || !api_key || !email || !subject || !description) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const url = `https://${domain}.freshdesk.com/api/v2/tickets`;

        const response = await axios.post(url, { email, subject, description, priority: 1, status: 2 }, {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${api_key}:X`).toString('base64'),
                'Content-Type': 'application/json'
            }
        });

        return res.status(200).json({ message: "Ticket created in Freshdesk", ticket: response.data });

    } catch (error) {
        console.error("Ticket creation error:", error.response?.data || error.message);
        return res.status(500).json({ message: "Ticket creation failed", error: error.response?.data || error.message });
    }
};

exports.getTicketConversation = async (req, res) => {

    const domain = process.env.FRESHDESK_DOMAIN;
    const api_key = process.env.FRESHDESK_API_KEY;
    const ticket_id = req.params.ticket_id;

    if (!domain || !api_key || !ticket_id) {
        return res.status(400).json({ message: "Missing domain, api_key or ticket_id" });
    }

    try {
        const url = `https://${domain}.freshdesk.com/api/v2/tickets/${ticket_id}/conversations`;

        const response = await axios.get(url, {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${api_key}:X`).toString('base64')
            }
        });

        res.status(200).json({ message: "Ticket conversation fetched", conversations: response.data });

    } catch (error) {
        console.error("Conversation fetch error:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch conversation", error: error.response?.data || error.message });
    }
};

exports.getHubSpotContact = async (req, res) => {

    const { email } = req.body;

    var token = process.env.HUBSPOT_TOKEN;

    if (!token || !email) {
        return res.status(400).json({ message: "Token and email are required" });
    }

    try {
        const response = await axios.post(
            'https://api.hubapi.com/crm/v3/objects/contacts/search',
            {
                filterGroups: [
                    {
                        filters: [
                            {
                                propertyName: "email",
                                operator: "EQ",
                                value: email
                            }
                        ]
                    }
                ],
                properties: ["firstname", "lastname", "email", "phone", "lifecyclestage", "company"]
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const results = response.data.results;

        if (!results.length) {
            return res.status(201).json({ message: "Contact not found in HubSpot" });
        }

        const contact = results[0].properties;

        res.status(200).json({
            message: "Contact found in HubSpot",
            contact: {
                name: `${contact.firstname || ""} ${contact.lastname || ""}`.trim(),
                email: contact.email,
                phone: contact.phone,
                lifecycle_stage: contact.lifecyclestage,
                company: contact.company
            }
        });

    } catch (error) {
        console.error("HubSpot API error:", error.response?.data || error.message);
        return res.status(500).json({ message: "HubSpot contact fetch failed", error: error.message });
    }
};
