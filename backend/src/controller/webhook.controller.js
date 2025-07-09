const webhooklog = require('../models/webhooklog')

exports.InsertWebhooks = async (req, res) => {

    try {
        const { body } = req;
        await webhooklog.create({
            event_type: body.event || 'unknown',
            payload: JSON.stringify(body)
        });

        console.log('Webhook Received:', body);
        res.status(200).json({ message: 'Webhook received' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving webhook' });
    }
}

exports.WebhookLogs = async (req, res) => {

    try {
        const logs = await webhooklog.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ message: 'Webhook Logs', logs: logs });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching logs' });
    }

}