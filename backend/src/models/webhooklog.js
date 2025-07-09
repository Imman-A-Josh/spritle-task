const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WebhookLog = sequelize.define('WebhookLog', {
    event_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payload: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'webhook_logs'
});

module.exports = WebhookLog;
