
import * as messageService from '../services/messageService.js';

export const sendMessage = async (req, res) => {
    try {
        const user = req.user.email;
        const { subject, message } = req.body;

        const messageData = {
            user,
            subject,
            message
        };

        await messageService.saveMessage(messageData);

        res.status(200).json({ message: 'Mensaje enviado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
