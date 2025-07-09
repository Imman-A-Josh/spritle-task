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

PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=spritle_task
JWT_SECRET=spritle_secret
FRESHDESK_API_KEY=gCdrnkvJuyWUVxHdg7C
FRESHDESK_DOMAIN=immanjosh4
HUBSPOT_TOKEN=pat-na2-85372677-0b3a-4d5d-8ee0-1aa2be0af692

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