import * as messageDao from '../dao/messageDao.js';

export const saveMessage = async (messageData) => {
    try {
        const savedMessage = await messageDao.createMessage(messageData);
        return savedMessage;
    } catch (error) {
        throw error;
    }
};
