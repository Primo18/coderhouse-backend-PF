import MessageManagerMongo from '../dao/messageDao.js';

const messageManagerMongo = new MessageManagerMongo();

class MessagesController {
    // Añadir un nuevo mensaje
    async addMessage(req, res) {
        try {
            const { user, message } = req.body;
            const newMessage = await messageManagerMongo.addMessage({ user, message });
            res.redirect('/chat');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener todos los mensajes
    async getAllMessages(req, res) {
        try {
            const messages = await messageManagerMongo.getAllMessages();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Obtener mensaje por usuario
    async getMessagesByUser(req, res) {
        try {
            const { user } = req.params;
            const message = await messageManagerMongo.getMessagesByUser(user);
            res.json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default MessagesController;
