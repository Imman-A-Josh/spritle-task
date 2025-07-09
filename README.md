# spritle-task

A full-stack application that integrates Freshdesk ticketing, HubSpot contacts, and webhook event logging. Built using Node.js (Express), React, Sequelize (MySQL), and external APIs.

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** React.js  
- **Database:** MySQL (with Sequelize ORM)  
- **APIs:** Freshdesk, HubSpot  
- **Auth:** JWT-based login system

---

## Setup Instructions

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/Imman-A-Josh/spritle-task.git
cd spritle-task/backend 
```

2. Install Dependencies

npm install

3. Create .env file with the following

``` bash
PORT=8080

DB_HOST=localhost

DB_USER=root

DB_PASS=root

DB_NAME=spritle_task

JWT_SECRET=spritle_secret

FRESHDESK_API_KEY=gCdrnkvJuyWUVxHdg7C

FRESHDESK_DOMAIN=immanjosh4

```

4. Run the server:

npm start

### Frontend Setup

1. Go to Frontend Folder

cd ../frontend

2. Install packages:

npm install

3. Start the React app:

npm start

## Features

Signup / Login using JWT auth

Freshdesk Ticket Listing with Status & Priority

Ticket Conversation Viewer

HubSpot Contact Fetch by Email

Webhook Integration (Freshdesk)

Webhook Logs Table View

## Sample User Credentials

``` bash
{
    "email": "immanjosh4@gmail.com",
    "password": "Admin@123"
}
```

## Webhook Configuration – Freshdesk

1. Login to your Freshdesk admin panel.
2. Go to **Admin → Automations → Ticket Created → New Rule**
3. Create a rule with the following:
   - **Event:** When an agent updates a ticket
   - **Action:** Trigger Webhook
   - **Method:** POST
   - **URL:** `https://spritle-task.onrender.com/api/freshdesk-webhook`
   - **Content-Type:** application/json
   - **Payload:**
     ```json
     {
       "event": "ticket_created",
       "ticket_id": "{{ticket.id}}",
       "subject": "{{ticket.subject}}",
       "status": "{{ticket.status}}",
       "priority": "{{ticket.priority}}",
       "requester_email": "{{ticket.requester.email}}"
     }
     ```
4. Save the rule, then update a ticket to trigger the webhook.

Repeat similar steps under **“Ticket Update”** tab to trigger for new ticket creation
