"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const message_1 = require("../database/models/message");
const users_1 = require("../database/models/users");
class MessageService {
    sendMessage(senderId, recieverId, type, text, mediaObj, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = yield users_1.User.findByPk(senderId);
            const reciever = yield users_1.User.findByPk(recieverId);
            if (!sender || !reciever)
                return;
            if (type === 'DOCUMENT') {
            }
            else if (type === 'MEDIA') {
            }
            else {
                // charger les donnes des users
                const message = yield message_1.Messages.create({
                    senderId,
                    recieverId,
                    text,
                    sentAt: new Date,
                    status: 'SENT'
                });
                // cas du texte
                app_1.io.to(reciever.socketId).emit('message', message);
            }
        });
    }
    getMessages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages;
            // retourner tous les messages dont le user est reciever du message et que le recievedAt soit null
        });
    }
}
exports.default = MessageService;
