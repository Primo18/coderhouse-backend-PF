import CustomRouter from "./CustomRouter.js";
import * as messageController from "../controllers/MessagesController.js";

class MessageRouter extends CustomRouter {
    init() {
        this.post('/send-message', ['AUTHENTICATED'], messageController.sendMessage);
    }
}

export default new MessageRouter().getRouter();