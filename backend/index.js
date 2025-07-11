require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db')
require('./src/models/user.model');
require('./src/models/webhooklog');
const authRoutes = require('./src/routes/user.routes');
const freshdeskRoutes = require('./src/routes/freshdesk.routes');
const middleware = require('./middleware');
const webhookRoutes = require('./src/routes/webhook.routes');


const app = express();
const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.json());

app.use(middleware)

app.use('/api', authRoutes);
app.use('/api', freshdeskRoutes);
app.use('/api', webhookRoutes);

sequelize.authenticate()
    .then(() => {
        console.log("DB Connected");

        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('DB connection error:', err);
    });