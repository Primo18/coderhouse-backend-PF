import Message from '../models/messageModel.js';

export const createMessage = async (messageData) => {
    try {
        const message = new Message(messageData);
        await message.save();
        return message;
    } catch (error) {
        throw error;
    }
};

export const getAllMessages = async () => {
    try {
        return await Message.find();
    } catch (error) {
        throw error;
    }
};

export const getMessagesByUser = async (user) => {
    try {
        return await Message.find({ user });
    }
    catch (error) {
        throw error;
    }
};