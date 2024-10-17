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
class socketService {
    constructor() {
        app_1.io.on('ack:message-1', (msg) => __awaiter(this, void 0, void 0, function* () {
            // update le message avec son id, le recievedAt
            yield message_1.Messages.update();
            const sender = yield users_1.User.findByPk(msg.senderId);
            app_1.io.to(sender.socketId).emit('ack:message-1', msg);
        }));
        app_1.io.on('ack:message-2', (msg) => __awaiter(this, void 0, void 0, function* () {
            // update le message avec son id, le seenAt
            yield message_1.Messages.update();
            const sender = yield users_1.User.findByPk(msg.senderId);
            app_1.io.to(sender.socketId).emit('ack:message-2', msg);
        }));
    }
}
exports.default = socketService;
