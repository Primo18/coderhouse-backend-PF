import Message from '../models/messageModel.js';

class MessageManagerMongo {
    // Añadir un nuevo mensaje
    async addMessage(messageData) {
        const newMessage = new Message(messageData);
        return await newMessage.save();
    }

    // Obtener todos los mensajes
    async getAllMessages() {
        return await Message.find();
    }

    // Obtener mensaje por usuario
    async getMessagesByUser(userEmail) {
        return await Message.find({ user: userEmail });
    }
}

export default MessageManagerMongo;
