import { Router } from 'express';
import MessagesController from '../controllers/MessagesController.js';

const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.post('/', messagesController.addMessage);
messagesRouter.get('/', messagesController.getAllMessages);
messagesRouter.get('/:user', messagesController.getMessagesByUser);


export default messagesRouter;
